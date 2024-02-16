import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { CommonError } from '@core/error-handler/common-error';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { FeesManageComponent } from '../fees-manage/fees-manage.component';
import { DuesManageComponent } from '../dues-manage/dues-manage.component';
import { BillTypeManageComponent } from '../../bills/bill-type-manage/bill-type-manage.component';

@Component({
  selector: 'app-fees-list',
  templateUrl: './fees-list.component.html',
  styleUrls: ['./fees-list.component.css']
})
export class FeesListComponent extends BaseComponent implements OnInit {
  isLoadingResults = false;
  fees: any;
  debtorType: any;
  displayedColumns: string[] = ['minAge', 'maxAge', 'entranceFee', 'annualDues', 'amount', 'action'];
  debtorTypeColumns: string[] = ['name', 'action'];

  constructor(
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private funeralFundService: FuneralFundService,
    private dialog: MatDialog,
  ) {
    super();

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoadingResults = true;
    this.funeralFundService.getAllAge()
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.fees = data;
        },
        (err: CommonError) => {
          err.messages.forEach(msg => {
            this.isLoadingResults = false;
            this.toastrService.error(msg);
          });
        }
      );
    this.funeralFundService.getAllDebtorTypes().subscribe((data: any) => {
      this.isLoadingResults = false;
      this.debtorType = data;
    },
      (err: CommonError) => {
        err.messages.forEach(msg => {
          this.isLoadingResults = false;
          this.toastrService.error(msg);
        });
      })
  }

  deleteAge(fees: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${fees.minAge + "-" + fees.maxAge + " yaş aralığı giriş ücreti " + fees.entranceFree}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.sub$.sink = this.funeralFundService.deleteAge(fees?.id).subscribe(() => {
            this.toastrService.success(this.translationService.getValue('FEE_DELETED_SUCCESSFULLY'));
            this.getAll();
          });

        }

      });
  }

  manageAge(fee?: any): void {
    const dialogRef = this.dialog.open(FeesManageComponent, {
      width: '400px',
      height: '400px',
      data: Object.assign({}, fee)
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    })

  }

  manageDue(due?: any): void {
    const dialogRef = this.dialog.open(DuesManageComponent, {
      width: '300px',
      height: '200px',
      data: Object.assign({}, due)
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    })
  }

  manageBillType(debtorType?: any): void {
    const dialogRef = this.dialog.open(BillTypeManageComponent, {
      width: '400px',
      height: '200px',
      data: Object.assign({}, debtorType)
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    })

  }


  deleteDebtorType(debtorType: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${debtorType.name}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.sub$.sink = this.funeralFundService.deleteDebtorType(debtorType.id).subscribe((data: any) => {
            if (data.success==true) {
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAll();
            }
            else {
              this.toastrService.error(data.errors[0]);
            }

          });

        }

      });
  }

}
