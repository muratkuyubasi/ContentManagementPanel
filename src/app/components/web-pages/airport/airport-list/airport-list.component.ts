import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { CommonError } from '@core/error-handler/common-error';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { WebPagesService } from './../../web-pages.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { AirportManageComponent } from '../airport-manage/airport-manage.component';
import { Airports } from '@core/domain-classes/web-pages';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent extends BaseComponent {
  isLoadingResults = false;
  airports: Airports[];
  displayedColumns: string[] = ['title', 'action'];
  isLoadingButton: boolean[]=[];

  constructor(
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,
    private dialog: MatDialog,
  ) {
    super();

  }

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports(): void {
    this.isLoadingResults = true;
    this.webPagesService.getFrontAllAirport()
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.airports = data;

        },
        (err: CommonError) => {
          err.messages.forEach(msg => {
            this.toastrService.error(msg);
          });
        }
      );
  }

  deleteAirport(airports: Airports,i) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${airports.name}`)
      .subscribe((resp: any) => {

        this.isLoadingButton[i] = !this.isLoadingButton[i];
        if (resp == true) {
          this.sub$.sink = this.webPagesService.deleteFrontAirports(airports.id).subscribe(() => {
            this.isLoadingButton[i] = !this.isLoadingButton[i];
            this.toastrService.success(this.translationService.getValue('AIRPORT_DELETED_SUCCESSFULLY'));
            this.getAirports();
          });
        }else {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }

      });
  }

  manageAirport(airports?: Airports): void {
    const dialogRef = this.dialog.open(AirportManageComponent, {
      width: '300px',
      height: '200px',
      data: Object.assign({}, airports)
    });
    this.sub$.sink = dialogRef.afterClosed()
      .subscribe(result => {
        this.getAirports();
      });


  }
}
