
import { UntypedFormGroup, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from '../../user/user.service';
import { User } from '@core/domain-classes/user';
import { FuneralFundUserPageService } from '../funeral-fund-user-page.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-old-user',
  templateUrl: './old-user.component.html',
  styleUrls: ['./old-user.component.css']
})
export class OldUserComponent extends BaseComponent implements OnInit {
  contactForm: FormGroup;
  addressForm: FormGroup;
  isValid: boolean = false;
  user: User;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Sweden, CountryISO.Finland, CountryISO.Turkey];
  searchPlaceHolder: string = "Ülke Ara"
  isLoading: boolean = false;
  placeHolder:string="Telefon"

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private funeralFundUserService: FuneralFundUserPageService) {
    super()
  }

  ngOnInit() {
    this.createForm();
    this.userService.getUserProfile().subscribe((user: User) => {
      this.user = user;


    });

  }


  createForm() {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],

    })

    this.addressForm = this.formBuilder.group({
      postCode: ['', Validators.required],
      district: ['', Validators.required],
      street: ['', Validators.required],
    });

  }

  save() {
    this.isLoading = true;

    const form = {
      id: this.user.id,
      userId: this.user.id,
      email: this.contactForm.get('email').value,
      phoneNumber: this.contactForm.get('phoneNumber').value.internationalNumber,
      password: this.contactForm.get('password').value,

      postCode: this.addressForm.get('postCode').value,
      district: this.addressForm.get('district').value,
      street: this.addressForm.get('street').value
    }

    this.sub$.sink = this.funeralFundUserService.updateFuneralFundUser(form).subscribe((data: any) => {
      this.isLoading=false;
      if (data.success == true) {
        this.contactForm.reset();
        this.addressForm.reset();

        let timerInterval;
        Swal.fire({
          icon: "success",
          title: "Bilgileriniz başarıyla güncellendi",
          html: "Giriş sayfasına yönlendiriliyorsunuz.Yeni şifreniz ve üye numaranız ile giriş yapabilirsiniz.",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then(() => {
          window.location.href = "/login";
        });


      } else {
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
      }
    })
  }

  checkForm(form: AbstractControl): boolean {
    this.isValid = form.dirty && form.valid && form.touched;
    return this.isValid;
  }

  nextTab(currentTabIndex: number) {
    currentTabIndex++;
    const tabId = `tab${currentTabIndex + 1}`;
    const tabRadio = document.getElementById(tabId) as HTMLInputElement;
    if (tabRadio) {
      tabRadio.click();
    }
  }

}
