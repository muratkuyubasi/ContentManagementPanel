import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { BillsManageComponent } from '../../bills/bills-manage/bills-manage.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { FileInfo } from '@core/domain-classes/file-info';
import { EmailSendService } from 'src/app/components/email-send/email-send.service';

@Component({
  selector: 'app-approve-detail',
  templateUrl: './approve-detail.component.html',
  styleUrls: ['./approve-detail.component.css']
})
export class ApproveDetailComponent extends BaseComponent implements OnInit {
  isLoading = false;
  spouse: any;
  children: any;
  isLoadingButton: boolean = false;
  headOfFamily: any;
  unpaid: any[] = [];
  paid: any[] = [];
  noteForm: UntypedFormGroup;
  isEditMode: boolean = false;
  id: number
  loadingId: number = 0;
  isLoadingNotes: boolean = false;
  isLoadingApprove: boolean = false;
  isLoadingFamilyDelete: boolean = false;
  familyId: number;
  emailForm: UntypedFormGroup;
  billPdf: any;
  member: any;

  gender = [
    { id: 1, name: "Kadın" },
    { id: 2, name: "Erkek" }
  ]

  nationality = [
    { id: 1, name: "T.C" },
    { id: 2, name: "Çifte Vatandaş" }
  ]

  constructor(
    private activeRoute: ActivatedRoute,
    private funeralFundService: FuneralFundService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private commonDialogService: CommonDialogService,
    private dialog: MatDialog,
    private emailSendService: EmailSendService

  ) {
    super();
  }

  ngOnInit() {
    this.getAll();


  }


  getAll() {
    this.isLoading = true;
    this.sub$.sink = this.activeRoute.params.subscribe((params: { familyId: any }) => {
      this.familyId = params.familyId;
      if (this.familyId) {
        this.funeralFundService.getFamilyByFamilyId(this.familyId).subscribe((data: any) => {
          this.isLoading = false
          this.member = data?.data;
          this.headOfFamily = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 1 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
          this.spouse = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 2 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
          this.children = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 3 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));

          const unpaid = this.member?.debtors?.filter(debtors => debtors?.isPayment === false);
          this.unpaid = unpaid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

          const paid = this.member?.debtors?.filter(debtor => debtor?.isPayment === true);
          this.paid = paid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

          this.createNotes();
          if (this.member?.familyNotes?.length > 0) {
            this.noteForm.get('text').patchValue(this.member?.familyNotes[0]?.text);
            this.noteForm.get('id').patchValue(this.member?.familyNotes[0]?.id);
            this.isEditMode = true;
          }


        })
      }
    });
  }

  deleteFamily(family: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${"Üye Numarası: " + family.memberId}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.isLoadingFamilyDelete = !this.isLoadingFamilyDelete;
          this.sub$.sink = this.funeralFundService.deleteFamily(this.familyId).subscribe((resp: any) => {
            this.toastr.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            this.router.navigate(['/funeral-fund']);
          });
        }
      });

  }



  approveFamily(id) {
    this.isLoadingApprove = true
    this.sub$.sink = this.funeralFundService.approveFamily(id).subscribe((data: any) => {
      this.isLoadingApprove = false;
      if (data.success == true) {
        this.toastr.success('Aile başarıyla onaylandı!', 'Başarılı');
        this.router.navigate(['funeral-fund']);
      }
      else {
        this.isLoadingApprove = false;
        this.toastr.error(data.errors[0])
      }
    }),
      (error: any) => {
        this.handleHttpError(error);
      }
  }

  manageBills(familyId?, debtor?): void {
    const dialogRef = this.dialog.open(BillsManageComponent, {
      width: '400px',
      height: '300px',
      data: { familyId, debtor }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();

    })
  }

  paidBills(id, debtorNumber) {
    if (id) {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_PAID')} Fatura Numarası: ${debtorNumber}`)
        .subscribe((resp: any) => {
          if (resp) {
            this.sub$.sink = this.funeralFundService.paidBills(id, debtorNumber).subscribe((data: any) => {
              this.toastr.success(this.translationService.getValue('SUCCESSFULLY'));
              this.getAll();
            });

          }
          (error: any) => {
            this.handleHttpError(error);
          }

        });
    }

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
            this.toastr.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            this.getAll();
          } else {
            this.toastr.error(resp.errors[0])
          }
        });

      });
  }

  sendEmail(debtorType, id, debtorNumber) {

    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_SEND_EMAIL')} ${"Fatura Numarası: " + debtorNumber}`)
      .subscribe((resp: any) => {
        if (resp) {
          const email = this.member.address.email.trim();
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
                this.toastr.success(this.translationService.getValue('EMAIL_SENT_SUCCESSFULLY'));
              });
          })


        }
      });
  }



  createNotes() {
    this.noteForm = this.formBuilder.group({
      familyId: this.familyId,
      id: [''],
      text: ['']
    })
  }

  addNotes() {

    this.isLoadingNotes = true;

    const note = this.noteForm.value

    if (this.isEditMode) {
      this.funeralFundService.updateFamilyNotes(note).subscribe(
        (data: any) => {
          if (data.success == true) {
            this.isLoadingNotes = false;
            this.toastr.success('Başarıyla güncellendi!', 'Başarılı');
            this.getAll();
          }
        },
        (error: any) => {
          this.isLoadingNotes = false;
          this.handleHttpError(error);
        }
      );
    }
    else {
      this.funeralFundService.addNotesFamily(note).subscribe(
        (data: any) => {
          this.isLoadingNotes = false;
          if (data.success == true) {
            this.toastr.success('Başarıyla eklendi!', 'Başarılı');
            this.getAll();
            this.id = data.data.id
          }
        },
        (error: any) => {
          this.isLoadingNotes = false;
          this.handleHttpError(error);
        }
      );


    }


  }


  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastr.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } else {
      this.toastr.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
}
