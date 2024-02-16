
import { FuneralFundService } from './../../funeral-fund/funeral-fund.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormArray, Validators, AbstractControl, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { environment } from '@environments/environment';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  mainForm: UntypedFormGroup
  spouseForm: UntypedFormGroup
  memberForm: UntypedFormGroup
  isValid: boolean = false;
  isLoadingButton: boolean = false;
  isAgreed: boolean = false;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Sweden, CountryISO.Finland, CountryISO.Turkey];
  placeHolder: string = "Ülke Ara"

  gender = [
    { id: 1, name: "Kadın" },
    { id: 2, name: "Erkek" }
  ]

  nationality = [
    { id: 1, name: "T.C" },
    { id: 2, name: "Çifte Vatandaş" }
  ]

  constructor(private funeralFundService: FuneralFundService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createMainForm();
    this.createMemberForm();
    this.createSpouseForm();
  }

  createMainForm() {
    this.mainForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.minLength(11)]],
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
      identificationNumber: ['', [Validators.required, Validators.minLength(11)]],
      birthPlace: ['', Validators.required],
      birthDay: ['', Validators.required],
      nationality: ['', Validators.required],
      genderId: ['', Validators.required],
      memberTypeId: [2]
    });
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
      identificationNumber: ['', [Validators.required, Validators.minLength(11)]],
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

  saveForm() {
    this.isLoadingButton = true;
    this.mainForm.value.address.phoneNumber = this.mainForm.get('address.phoneNumber').value.internationalNumber;
    
    const formData = {
      mainForm: this.mainForm.value
    };

    if (this.spouseForm.valid) {
      formData.mainForm.familyMembers.push(this.spouseForm.value);
    }

    if (this.memberForm.valid) {
      this.memberForm.value.familyMembers.forEach((x) => formData.mainForm.familyMembers.push(x));
    }

    this.funeralFundService.addFamily(formData.mainForm).subscribe((data: any) => {
      this.isLoadingButton = false;
      if (data.success == true) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Başvurunuz başarıyla gönderildi!",
          text: "Giriş faturanız mail adresinize gönderilmiştir. Giriş faturanızı buradan da görüntüleyebilirsiniz",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Faturayı görüntüle",
          cancelButtonText: "Kapat",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const pdfLink = environment.apiUrl + data.data.pdfPath;
            let link = document.createElement('a');
            link.href = pdfLink;
            link.target = '_blank';
            link.click();
          } else (
            result.dismiss === Swal.DismissReason.cancel
          )
        });

        this.memberForm.reset();
        this.mainForm.reset();
        this.spouseForm.reset();

      }
      else {
        const errorMessage = data.errors[0];
        Swal.fire({
          icon: "error",
          title: "Başarısız",
          text: errorMessage,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: "#d33",
          cancelButtonText: "Kapat"
        }).then((result) => {
          if (result.isDismissed) {
            result.dismiss === Swal.DismissReason.cancel
          }
        });

        if (this.spouseForm.valid) {
          formData.mainForm.familyMembers.pop();
        }
        if (this.memberForm.valid) {
          this.memberForm.value.familyMembers.forEach((x) => formData.mainForm.familyMembers.pop());
        }
      }
    }, (error: any) => {
      this.isLoadingButton = false;
      if (error && error.errors && error.errors.length > 0) {
        const errorMessage = error.errors[0];

        Swal.fire({
          icon: "error",
          title: "Başarısız",
          text: errorMessage,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: "#d33",
          cancelButtonText: "Kapat"
        }).then((result) => {
          if (result.isDismissed) {
            result.dismiss === Swal.DismissReason.cancel
          }
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Başarısız",
          text: "Başvurunuz sırasında bir hata oluştu",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: "#d33",
          cancelButtonText: "Kapat"
        }).then((result) => {
          if (result.isDismissed) {
            result.dismiss === Swal.DismissReason.cancel
          }
        });

      }
    });
  }



  nextTab(currentTabIndex: number) {
    currentTabIndex++;
    const tabId = `tab${currentTabIndex + 1}`;
    const tabRadio = document.getElementById(tabId) as HTMLInputElement;
    if (tabRadio) {
      tabRadio.click();
    }
  }



  checkForm(form: AbstractControl, type: number): boolean {
    if (type === 1) {
      const firstName = form.get('firstName').value;
      const lastName = form.get('lastName').value;
      const identificationNumber = form.get('identificationNumber').value;
      const birthPlace = form.get('birthPlace').value;
      const birthDay = form.get('birthDay').value;
      const genderId = form.get('genderId').value;
      const nationality = form.get('nationality').value;

      return (
        !!firstName &&
        !!lastName &&
        !!identificationNumber &&
        identificationNumber.length >= 11 &&
        !!birthPlace &&
        !!birthDay &&
        !!genderId &&
        !!nationality
      );
    }
    else if (type === 2) {
      const addressForm = this.mainForm.get('address') as FormGroup;
      return Object.values(addressForm.controls).every(control => control.value !== null && control.value !== '');
    }
    else {
      this.isValid = form.dirty && form.valid && form.touched;
      return this.isValid;
    }
  }



}
