import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../funeral-fund.service';


@Component({
  selector: 'app-funeral-fund-manage',
  templateUrl: './funeral-fund-manage.component.html',
  styleUrls: ['./funeral-fund-manage.component.css']
})
export class FuneralFundManageComponent extends BaseComponent implements OnInit {
  isLoading = false;
  mainForm: UntypedFormGroup
  spouseForm: UntypedFormGroup
  memberForm: UntypedFormGroup
  isLoadingButton: boolean = false
  showSpouseForm: boolean = false
  showMemberForm: boolean = false
  member: any;


  gender = [
    { id: 1, name: "Kadın" },
    { id: 2, name: "Erkek" }
  ]

  nationality = [
    { id: 1, name: "T.C" },
    { id: 2, name: "Çifte Vatandaş" }
  ]

  constructor(private funeralFundService: FuneralFundService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService  ) {
    super();
  }

  ngOnInit(): void {
    this.createMainForm();
    this.createMemberForm();
    this.createSpouseForm();
  }




  createMainForm() {
    this.mainForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      birthPlace: ['', Validators.required],
      birthDay: ['', Validators.required],
      genderId: ['', Validators.required],
      nationality: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postCode: ['', Validators.required],
        district: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      familyMembers: this.formBuilder.array([]),
    });
  }



  createSpouseForm() {
    this.spouseForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['',[ Validators.required, Validators.minLength(11)]],
      birthPlace: ['', Validators.required],
      birthDay: ['', Validators.required],
      nationality: ['', Validators.required],
      genderId: ['', Validators.required],
      memberTypeId: [2]
    });
  }

  spouseFormShow() {
    this.showSpouseForm = !this.showSpouseForm;
  }

  showFamilyMemberForm() {
    this.showMemberForm = !this.showMemberForm;
  }

  createMemberForm() {
    this.memberForm = this.formBuilder.group({
      familyMembers: this.formBuilder.array([this.createFamilyMemberForm()])
    });
  }

  createFamilyMemberForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      birthPlace: ['', Validators.required],
      birthDay: ['', Validators.required],
      genderId: ['', Validators.required],
      memberTypeId: [3]
    });
  }


  get familyMembers() {
    return this.memberForm.get('familyMembers') as FormArray;
  }

  addNewFamilyMember() {
    this.familyMembers.push(this.createFamilyMemberForm());
  }

  // removeFamilyMember() {
  //   if (this.familyMembers.length > 0) {
  //     this.familyMembers.removeAt(this.familyMembers.length - 1);
  //   }
  // }

  saveMemberForm() {
    this.isLoadingButton = true;
    const formData = {
      mainForm: this.mainForm.value,
    };

    if (this.spouseForm.valid && this.showSpouseForm) {
      formData.mainForm.familyMembers.push(this.spouseForm.value);
    }

    if (this.showMemberForm && this.memberForm.valid) {
      this.memberForm.value.familyMembers.forEach((x) => formData.mainForm.familyMembers.push(x));
    }



    this.funeralFundService.addFamily(formData.mainForm).subscribe(
      (data: any) => {

        this.isLoadingButton = false;

        if (data.success == true) {
          this.toastr.success('Kayıt başarıyla oluşturuldu!', 'Başarılı');
          this.memberForm.reset();
          this.mainForm.reset();
          this.familyMembers.reset();

        }
        else {
          this.toastr.error(data.errors[0])
          if (this.spouseForm.valid && this.showSpouseForm) {
            formData.mainForm.familyMembers.pop();
          }
          if (this.showMemberForm && this.memberForm.valid) {
            this.memberForm.value.familyMembers.forEach((x) => formData.mainForm.familyMembers.pop());
          }
        }
      },
      (error: any) => {
        this.isLoadingButton = false;
        if (error && error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0];
          this.toastr.error('Kayıt sırasında bir hata oluştu!', 'Başarısız');

        } else {
          this.toastr.error('Kayıt sırasında bir hata oluştu!', 'Başarısız');
        }
      }
    );
  }

}
