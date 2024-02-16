import { FuneralFundService } from './../../funeral-fund/funeral-fund.service';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@core/domain-classes/user';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent extends BaseComponent implements OnInit {
  member: User;
  familyMembers: any;
  headOfFamily: any;
  spouse: any;
  children: any;
  unpaid: any;
  paid: any;
  isLoading: boolean = false;
  headOfFamilyLoading: boolean = false;

  constructor(private userService: UserService,
    private funeralFundService: FuneralFundService,
    private translationService: TranslationService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,) {
    super();
  }

  ngOnInit(): void {
    this.getAll();


  }

  getAll() {

    this.isLoading = true;
    this.sub$.sink = this.userService.getUserProfile().subscribe((data: User) => {
      this.member = data;
      if (this.member) {

        this.funeralFundService.getFamilyByUserId(this.member.id).subscribe((family: any) => {
          this.familyMembers = family
          this.isLoading = false;
          this.headOfFamily = this.familyMembers?.familyMembers.filter(member => member?.memberUser?.memberTypeId === 1);
          this.spouse = this.familyMembers?.familyMembers.filter(member => member.memberUser.memberTypeId === 2);
          this.children = this.familyMembers?.familyMembers.filter(member => member.memberUser.memberTypeId === 3);

          const unpaid = this.familyMembers?.debtors?.filter(debtors => debtors?.isPayment === false);
          this.unpaid = unpaid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

          const paid = this.familyMembers?.debtors?.filter(debtor => debtor?.isPayment === true);
          this.paid = paid.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
        })

      }

    });


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

  updateFamilyHead(spouse) {

    const id = spouse.memberUser?.id
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_MARK_AS_HEAD')} ${spouse.memberUser?.firstName.toUpperCase()} ${spouse.memberUser?.lastName.toUpperCase()}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.headOfFamilyLoading = true
          this.funeralFundService.updateFamilyHead(this.familyMembers.id, id).subscribe(
            (data: any) => {
              this.headOfFamilyLoading = false;
              if (data.success == true) {
                this.headOfFamilyLoading = false;
                this.toastrService.success('Başarıyla güncellendi!', 'Başarılı');
                this.getAll();
              } else {
                this.headOfFamilyLoading = false;
                this.toastrService.error(data.errors[0]);
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

  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }



}
