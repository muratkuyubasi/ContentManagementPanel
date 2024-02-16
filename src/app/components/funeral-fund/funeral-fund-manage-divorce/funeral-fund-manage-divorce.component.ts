import { FamilyMembers } from './../../../core/domain-classes/member';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages/web-pages.service';
import { FuneralFundService } from '../funeral-fund.service';

@Component({
  selector: 'app-funeral-fund-manage-divorce',
  templateUrl: './funeral-fund-manage-divorce.component.html',
  styleUrls: ['./funeral-fund-manage-divorce.component.css']
})
export class FuneralFundManageDivorceComponent extends BaseComponent implements OnInit {
  isLoadingButton: boolean = false;
  headOfFamily: any;
  spouse: any;
  children: any;
  selectedPersonId: number | null = null;
  familyId: any;

  constructor(
    public dialogRef: MatDialogRef<FuneralFundManageDivorceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private funeralFundService: FuneralFundService,
    private commonDialogService: CommonDialogService
  ) {
    super();
  }

  ngOnInit() {
    this.headOfFamily = this.data?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 1 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
    this.spouse = this.data?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 2 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
    this.children = this.data?.familyMembers?.filter(member => member?.memberUser?.memberTypeId === 3 && (member?.memberUser?.isDeleted === false || member?.memberUser?.isDeleted === null) && (member?.memberUser?.isDead === false || member?.memberUser?.isDead === null));
    this.familyId = this.data?.address.familyId

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCheckboxChange(personId: number) {
    this.selectedPersonId = personId;

  }


  save(): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_SAVE')}`)
      .subscribe((resp: any) => {
        if (resp) {
          if (this.data) {
            this.isLoadingButton = true;
            this.funeralFundService.parentalDivorce(this.familyId).subscribe((resp: any) => {

              if (this.children.length > 0) {

                if (this.selectedPersonId == 1) {
                  this.selectedPersonId = this.familyId;
                  this.isLoadingButton = false;
                } else {
                  this.selectedPersonId = resp?.data?.address?.familyId
                  this.isLoadingButton = true;
                }

                this.funeralFundService.transferChildrenToAnotherFamily(this.familyId, this.selectedPersonId).subscribe((data: any) => {

                  if (data.success == true) {
                    this.isLoadingButton = false;
                    this.toastrService.success(this.translationService.getValue('SUCCESSFULLY'));
                    this.dialogRef.close();

                  } else {
                    this.isLoadingButton = false;
                    this.toastrService.error(data.errors[0]);
                  }
                });

              } else {
                if (resp.success == true) {

                  this.isLoadingButton = false;
                  this.toastrService.success(this.translationService.getValue('SUCCESSFULLY'));
                  this.dialogRef.close();
                } else {
                  this.isLoadingButton = false;
                  this.toastrService.error(resp.errors[0]);
                }

              }

            });

          } else {
            this.isLoadingButton = false;
            this.toastrService.error('Hata oluştu!', 'Başarısız!');
          }

        }

      });


  }





}
