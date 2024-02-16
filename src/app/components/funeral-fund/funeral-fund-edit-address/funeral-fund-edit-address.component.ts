import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../funeral-fund.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-funeral-fund-edit-address',
  templateUrl: './funeral-fund-edit-address.component.html',
  styleUrls: ['./funeral-fund-edit-address.component.css']
})
export class FuneralFundEditAddressComponent extends BaseComponent implements OnInit {
  isLoading = false;
  adressForm: UntypedFormGroup
  address: any;
  member: any;
  isLoadingButton: boolean = false;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Sweden,CountryISO.Finland,CountryISO.Turkey];
  placeHolder: string = "Ülke Ara"
  
  constructor(private funeralFundService: FuneralFundService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createMainForm();
    this.getAddress();


  }

  getAddress() {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { familyId: any}) => {
      const familyId = params.familyId;
      if (familyId) {
        this.sub$.sink = this.funeralFundService.getFamilyByFamilyId(familyId).subscribe((data: any) => {
          this.member = data.data;
          this.address = this.member.address;
          this.adressForm.patchValue(this.address)
        })


      }

    });


  }

  createMainForm() {
    this.adressForm = this.formBuilder.group({
      familyId: [''],
      street: ['', Validators.required],
      postCode: ['', Validators.required],
      district: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]

    });
  }


  updateAddressForm() {
    this.isLoadingButton = true;
    this.funeralFundService.updateFamilyAddress(this.adressForm.value).subscribe(
      (data: any) => {
        this.isLoadingButton = false;
        if (data.success == true) {
          this.toastr.success('Başarıyla güncellendi!', 'Başarılı');
          this.getAddress();
        }
        else {
          this.toastr.error('Güncelleme sırasında bir hata oluştu!', 'Başarısız');
        }


      }
    );

  }


}
