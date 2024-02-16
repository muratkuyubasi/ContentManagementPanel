import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuneralFundService } from '../funeral-fund.service';
import { BaseComponent } from 'src/app/base.component';
import moment from 'moment';

@Component({
  selector: 'app-funeral-fund-edit',
  templateUrl: './funeral-fund-edit.component.html',
  styleUrls: ['./funeral-fund-edit.component.css']
})
export class FuneralFundEditComponent extends BaseComponent implements OnInit {
  isLoading = false;
  mainForm: UntypedFormGroup
  member: any;
  familyId: any;
  isLoadingButton: boolean = false;
  isShowNationality: boolean = true;

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
    this.sub$.sink = this.activeRoute.params.subscribe((params: { familyId: string }) => {
      this.familyId = params.familyId;
      if (this.familyId) {
        this.funeralFundService.getMemberById(this.familyId).subscribe((data: any) => {
          this.isLoading = false;
          this.member = data
          const formatDate = moment(this.member?.birthDay).format('yyyy-MM-DD');
          this.mainForm.patchValue(this.member)
          this.mainForm.patchValue(
            { birthDay: formatDate }
          )
          if (this.member.memberTypeId === 3) {
            this.isShowNationality = false;

          }

        }

        )
      }
    });

  }

  createMainForm() {
    this.mainForm = this.formBuilder.group({
      memberTypeId: this.member?.memberTypeId,
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.minLength(11)]],
      birthPlace: ['', Validators.required],
      birthDay: ['', Validators.required],
      genderId: ['', Validators.required],
      nationality: [''],
    });
  }

  updateMainForm() {
    this.isLoadingButton = true;
    this.funeralFundService.updateFamilyMember(this.mainForm.value).subscribe(
      (data: any) => {
        this.isLoadingButton = false;

        if (data.success == true) {
          this.toastr.success('Başarıyla güncellendi!', 'Başarılı');
          this.getInformation();
        }
      },
      (error: any) => {
        this.isLoadingButton = false;
        if (error && error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0];
          this.toastr.error('Güncelleme sırasında bir hata oluştu!', 'Başarısız');
        } else {
          this.toastr.error('Güncelleme sırasında bir hata oluştu!', 'Başarısız');
        }
      }
    );

  }




}
