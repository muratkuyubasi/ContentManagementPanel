import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../funeral-fund.service';

@Component({
  selector: 'app-funeral-fund-add-person',
  templateUrl: './funeral-fund-add-person.component.html',
  styleUrls: ['./funeral-fund-add-person.component.css']
})
export class FuneralFundAddPersonComponent extends BaseComponent implements OnInit {
  isLoading: boolean = false;
  mainForm: UntypedFormGroup
  memberId: any;
  isLoadingButton: boolean = false;
  family: any;
  familyId: any;
  isSpouse: boolean = false;
  showSpouseForm: boolean = false
  showMemberForm: boolean = false
  memberTypeId: any;
  isShowNationality: boolean = true;

  gender = [
    { id: 1, name: "Kadın" },
    { id: 2, name: "Erkek" }
  ]

  nationality = [
    { id: 1, name: "T.C" },
    { id: 2, name: "Çifte Vatandaş" }
  ]

  memberType = [
    { id: 2, name: "Eş" },
    { id: 3, name: "Çocuk" }
  ]

  constructor(private funeralFundService: FuneralFundService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {

    this.createMainForm();
    this.getInformation();
  }

  getInformation() {
    this.isLoading = true;
    this.sub$.sink = this.activeRoute.params.subscribe((params: { familyId: any }) => {
      this.isLoading = false;
      this.familyId = params.familyId;
      this.sub$.sink = this.funeralFundService.getFamilyByFamilyId(this.familyId).subscribe((data: any) => {
        this.family = data.data;
        this.family.familyMembers.forEach(f => {
          const members = f.memberUser
          if (members.memberTypeId === 2 && members.isDeleted == false && members.isDead == false) {
            this.isSpouse = true;
            const indexToDelete = this.memberType.findIndex(item => item.id === 2);
            if (indexToDelete !== -1) {
        
              this.memberType.splice(indexToDelete, 1);
              this.isShowNationality = false;
              this.mainForm.get('memberUser').get('memberTypeId').setValue(this.memberType[0].id)
            }
          }



        });
        this.createMainForm();
      });


    });

  }

  getMemberType(e) {
    if (e == 3) {
      this.isShowNationality = false;
    }
    else {
      this.isShowNationality = true;
    }
    this.memberTypeId = e;


  }

  createMainForm() {
    this.mainForm = this.formBuilder.group({
      familyId: this.familyId,
      memberUser: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        identificationNumber: ['',[ Validators.required, Validators.minLength(11)]],
        birthPlace: ['', Validators.required],
        birthDay: ['', Validators.required],
        genderId: ['', Validators.required],
        nationality: ['null', Validators.required],
        memberTypeId: [this.memberTypeId, Validators.required]
      }),
    });
  }


  addNewMemberForm() {
    
    this.isLoadingButton = true;
    this.funeralFundService.addNewFamilyMember(this.mainForm.value).subscribe(
      (data: any) => {
        this.isLoadingButton = false;
        if (data.success == true) {
          this.toastr.success('Başarıyla eklendi!', 'Başarılı');
          this.mainForm.reset();
          this.getInformation();
        
        }
        else {
          this.toastr.error(data.errors[0]);
        }
      },
      (error: any) => {
        this.isLoadingButton = false;
        if (error && error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0];
          this.toastr.error('Ekleme sırasında bir hata oluştu!', 'Başarısız');
        } else {
          this.toastr.error('Ekleme sırasında bir hata oluştu!', 'Başarısız');
        }
      }
    );

  }

}