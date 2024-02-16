import { environment } from '@environments/environment';
import { FuneralFundService } from './../funeral-fund.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { MatDialog } from '@angular/material/dialog';
import { FuneralFundManageDivorceComponent } from '../funeral-fund-manage-divorce/funeral-fund-manage-divorce.component';
import { BillsManageComponent } from '../bills/bills-manage/bills-manage.component';
import { EmailSendService } from '../../email-send/email-send.service';

@Component({
  selector: 'app-funeral-fund-detail',
  templateUrl: './funeral-fund-detail.component.html',
  styleUrls: ['./funeral-fund-detail.component.css']
})
export class FuneralFundDetailComponent extends BaseComponent implements OnInit {
  isLoading: boolean = false;
  spouse: any;
  children: any;
  headOfFamily: any;
  deletedMember: any[] = [];
  unpaid: any[] = [];
  paid: any[] = [];
  death: any[] = [];
  isLoadingButton: boolean = false;
  loadingId: number = 0;
  noteForm: UntypedFormGroup;
  isEditMode: boolean = false;
  id: number
  headOfFamilyLoading: boolean = false;
  isLoadingNotes: boolean = false;
  loadingMemberDelete: boolean = false;
  loadingBills: boolean = false;
  emailForm: UntypedFormGroup;
  billPdf: any;
  familyId: any;
  member: any;
  pdfSrc: any;
  showMemberCard: boolean = true;

  constructor(private funeralFundService: FuneralFundService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private translationService: TranslationService,
    private toastrService: ToastrService,
    private router: Router,
    private commonDialogService: CommonDialogService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private emailSendService: EmailSendService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    this.sub$.sink = this.activeRoute.params.subscribe((params: { familyId: any }) => {
      this.familyId = params.familyId;
      if (this.familyId) {
        this.funeralFundService.getFamilyByFamilyId(this.familyId).subscribe((data: any) => {
          this.isLoading = false;
          this.member = data.data;
          this.headOfFamily = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 1 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
          this.spouse = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 2 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
          this.children = this.member?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 3 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));

          const unpaid = this.member?.debtors?.filter(debtors => debtors?.isPayment === false);
          this.unpaid = unpaid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

          const paid = this.member?.debtors?.filter(debtor => debtor?.isPayment === true);
          this.paid = paid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

          this.deletedMember = this.member?.familyMembers?.filter(member => member?.memberUser?.isDeleted === true);
          this.death = this.member?.familyMembers?.filter(member => member?.memberUser?.isDead === true);

          this.createNotes();
          if (this.member.familyNotes.length > 0) {
            this.noteForm.get('text').patchValue(this.member.familyNotes[0].text)
            this.noteForm.get('id').patchValue(this.member.familyNotes[0].id)
            this.isEditMode = true;
          }

          if (this.headOfFamily[0]?.memberUser?.id != undefined) {
            this.showMemberCard = true;
            this.sub$.sink = this.funeralFundService.getMemberCard(this.headOfFamily[0]?.memberUser?.id).subscribe((data: any) => {

              this.pdfSrc = environment.apiUrl + data;
              let iframe = document.createElement('iframe');
              iframe.src = this.pdfSrc;
              iframe.width = '100%';
              iframe.height = '800px';
              document.body.appendChild(iframe);
              let container = document.querySelector('.address-box.pdf-container');
              container.appendChild(iframe);

            },
              (error: any) => {
                console.error(error);
              });

          } else {
            this.showMemberCard = false;
          }
        })
      }
    });
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
              .subscribe(() => {
                this.toastr.success(this.translationService.getValue('EMAIL_SENT_SUCCESSFULLY'));
              });
          })


        }
      });
  }


  deleteFamilyMember(id: any) {
    if (id) {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
        .subscribe((resp: any) => {
          if (resp) {
            this.loadingMemberDelete = true;
            this.sub$.sink = this.funeralFundService.deleteFamilyMember(id).subscribe((data: any) => {
              this.loadingMemberDelete = false;
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAll();

            });

          } else {
            this.loadingMemberDelete = false;
          }
          (error: any) => {
            this.loadingMemberDelete = false;
            this.handleHttpError(error);
          }

        });
    }
  }



  getId(id: any) {
    this.router.navigate(['funeral-fund/edit', id]);
  }


  createNotes() {
    this.noteForm = this.formBuilder.group({
      familyId: this.member.id,
      id: [''],
      text: ['']
    })
  }


  updateFamilyHead(spouse) {
    const id = spouse.memberUser?.id
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_MARK_AS_HEAD')} ${spouse.memberUser?.firstName.toUpperCase()} ${spouse.memberUser?.lastName.toUpperCase()}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.headOfFamilyLoading = true
          this.funeralFundService.updateFamilyHead(this.member.id, id).subscribe(
            (data: any) => {
              this.headOfFamilyLoading = false;
              if (data.success == true) {
                this.headOfFamilyLoading = false;
                this.toastr.success('Başarıyla güncellendi!', 'Başarılı');
                this.getAll();
              } else {
                this.headOfFamilyLoading = false;
                this.toastr.error(data.errors[0]);
              }
            },
            (error: any) => {
              this.headOfFamilyLoading = false;
              this.handleHttpError(error);
            }
          );

        }

      });
  }

  manageDivorce(member?: any): void {
    const dialogRef = this.dialog.open(FuneralFundManageDivorceComponent, {
      width: '400px',
      height: '400px',
      data: member
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    })
  }


  deleteFamily(family: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${"Üye Numarası: " + family.memberId}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.isLoadingButton = !this.isLoadingButton;
          this.sub$.sink = this.funeralFundService.deleteFamily(this.familyId).subscribe((resp: any) => {
            this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            this.router.navigate(['/funeral-fund']);
          });
        }
      });

  }

  addNotes() {
    this.isLoadingNotes = true;
    const note = this.noteForm.value

    if (this.isEditMode) {
      this.funeralFundService.updateFamilyNotes(note).subscribe(
        (data: any) => {
          this.isLoadingNotes = false;
          if (data.success == true) {
            this.toastr.success('Başarıyla güncellendi!', 'Başarılı');
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
            this.id = data.data.id
            this.getAll();
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
