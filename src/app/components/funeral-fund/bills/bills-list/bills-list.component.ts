import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { EmailSendService } from 'src/app/components/email-send/email-send.service';
import { BillsManageComponent } from '../bills-manage/bills-manage.component';
import { environment } from '@environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import Swal from 'sweetalert2';
import { PaginatorService } from '@core/services/paginator.service';




@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent extends BaseComponent implements OnInit {
  skip: number = 0;
  pageSize: number = 25;
  totalCount: number = 0;
  isLoadingResults = false;
  isPaid: string = '1';
  isLoadingButton: boolean = false
  enteredYear: number = 0;
  search: any = '';
  billPdf: any;
  emailForm: UntypedFormGroup;
  bills: any;
  order: any = '';
  sortedColumn: string = '';
  pdfLink: string = "";
  longProccess: boolean = false;
  debtorYear: number = 0;
  @ViewChild('yearInput') yearInput: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private searchSubject = new Subject<any>();

  constructor(
    private toastrService: ToastrService,
    private funeralFundService: FuneralFundService,
    private translationService: TranslationService,
    private commonDialogService: CommonDialogService,
    private emailSendService: EmailSendService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private paginatorService: PaginatorService
  ) {
    super();
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.skip = 0;
        this.pageSize = 25;
        this.totalCount = 0;
        this.paginator.pageIndex = 0;
        this.getAll();

      });
  }

  ngOnInit(): void {
    this.getAll();
    this.paginatorService.configurePaginator();
  }


  //0 tümü 1 ödenmemiş 2 ödenmiş fatura
  getAll() {
    this.isLoadingResults = true

    this.sub$.sink = this.funeralFundService.getBills(this.skip,
      this.pageSize, this.enteredYear, this.isPaid, this.search, this.order).subscribe((data: any) => {
        this.isLoadingResults = false;
        if (data) {
          this.bills = data.data;
          this.totalCount = data.totalCount;
        }
        else {
          this.toastrService.error(data.errors[0])
        }
      },
        (error: any) => {
          this.isLoadingResults = false;
          if (error.code === 500) {
            this.toastrService.error("Zaman aşımı");

          }
          else {
            this.isLoadingResults = false;
            this.handleHttpError(error);
          }

        }

      )
  }

  onChange(e, type) {
    if (type == 1) {
      this.search = e.target.value ? e.target.value : ''
    }
    if (type == 2) {
      this.enteredYear = e.target.value ? e.target.value : 0
    }
    if (type == 3) {
      this.isPaid = e.target.value ? e.target.value : '0'
    }

    const searchData = {
      search: this.search,
      enteredYear: this.enteredYear,
      isPaid: this.isPaid
    }

    this.searchSubject.next(searchData);
  }


  paidBills(id, debtorNumber) {
    if (id) {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_PAID')} Fatura Numarası: ${debtorNumber}`)
        .subscribe((resp: any) => {
          if (resp) {
            this.sub$.sink = this.funeralFundService.paidBills(id, debtorNumber).subscribe((data: any) => {
              this.toastrService.success(this.translationService.getValue('SUCCESSFULLY'));
              this.getAll();
            });

          }
          (error: any) => {
            this.handleHttpError(error);
          }

        });
    }

  }


  manageBills(familyId, debtor?): void {
    const dialogRef = this.dialog.open(BillsManageComponent, {
      width: '400px',
      height: '300px',
      data: { familyId, debtor }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();

    })
  }



  viewBill(id, debtorNumber) {

    this.sub$.sink = this.funeralFundService.getBillsPdf(id, debtorNumber).subscribe((data: any) => {
      const pdfLink = environment.apiUrl + data;
      let link = document.createElement('a');
      link.href = pdfLink;
      link.target = '_blank';
      link.click();
      document.body.removeChild(link);



    })
  }

  deleteBill(familyId, debtorNumber) {

    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} Fatura Numarası: ${debtorNumber}`)
      .subscribe((resp: any) => {
        this.sub$.sink = this.funeralFundService.deleteBill(familyId, debtorNumber).subscribe((data: any) => {
          if (data.success == true) {
            this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            this.getAll();
          } else {
            this.toastrService.error(resp.errors[0])
          }
        });

      });
  }

  sendEmail(debtorType, id, debtorNumber) {

    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_SEND_EMAIL')} ${"Fatura Numarası: " + debtorNumber}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.sub$.sink = this.funeralFundService.getFamilyByFamilyId(id).subscribe((data: any) => {
            var email = data.data.address.email
            email.trim();
            this.emailForm = this.formBuilder.group({
              id: [''],
              toAddress: email,
              cCAddress: [''],
              subject: ['İsveç Cenaze Fonu ' + debtorType + ' Faturası'],
              body: [''],
              attachmentFileURL: this.formBuilder.array([])
            });
            this.funeralFundService.getBillsPdf(id, debtorNumber).subscribe((data: any) => {
              const pdfLink = '/' + data;
              this.billPdf = this.emailForm.get('attachmentFileURL') as FormArray;
              this.billPdf.push(this.formBuilder.control(pdfLink));
              this.emailSendService.sendEmail(this.emailForm.value)
                .subscribe((data: any) => {
                  this.toastrService.success(this.translationService.getValue('EMAIL_SENT_SUCCESSFULLY'));
                });
            })
          })




        }
      });
  }

  printAllDebtor() {
    var input = this.yearInput.nativeElement.value
    if (input && input.length === 4) {
      this.debtorYear = input

      this.sub$.sink = this.funeralFundService.getCheckBillFile(this.debtorYear).subscribe((data: any) => {
        this.pdfLink = environment.apiUrl + data;
        if (data == false) {
          this.getBillFolder();
        }
        else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-warning",
              cancelButton: "btn btn-success"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Bu yıla ait fatura daha önce yazdırılmış",
            text: "Faturaları tekrar yazdırın ya da yazdırılmış faturayı indirin",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Faturayı tekrar yazdır",
            cancelButtonText: "Yazdırılan faturayı indir",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.getBillFolder()
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              this.downloadAllBill()
            }
          });
        }
      })
    }
  }


  getBillFolder() {
    this.isLoadingButton = true;
    this.longProccess = true;
    this.sub$.sink = this.funeralFundService.getBillstoFolder(this.debtorYear).subscribe((data: any) => {
      this.isLoadingButton = false;
      this.longProccess = false;
      this.downloadAllBill()
    }, (error: any) => {
      this.isLoadingButton = false;
      this.longProccess = false;
    }
    );
  }

  downloadAllBill() {
    let link = document.createElement('a');
    link.href = this.pdfLink;
    link.click();
    document.body.removeChild(link);
  }



  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  onPageChange(e) {
    this.skip = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAll()

  }

  arrangement(column: string) {
    this.sortedColumn = column;
    this.order = this.order === `${column} asc` ? `${column} desc` : `${column} asc`;
    this.getAll();
  }


}
