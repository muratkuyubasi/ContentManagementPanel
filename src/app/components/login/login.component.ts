import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '@core/domain-classes/user';
import { UserAuth } from '@core/domain-classes/user-auth';
import { CommonError } from '@core/error-handler/common-error';
import { SecurityService } from '@core/security/security.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../funeral-fund/funeral-fund.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginFormGroup: UntypedFormGroup;
  isLoading = false;
  userData: User;
  resultMessage: string;
  fieldTextType: boolean = false;
  showForm: string = '';
  showLoginButton: boolean = false;
  isLoadingButton: boolean = false;
  entranceFree: number;
  @ViewChild('yearInput') yearInput: ElementRef;

  constructor(
    private fb: UntypedFormBuilder,
    private securityService: SecurityService,
    private funeralFundService: FuneralFundService,
    private toastr: ToastrService,
    private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.createFormGroup();

  }

  onLoginSubmit() {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      var userObject = Object.assign(this.loginFormGroup.value);
      this.sub$.sink = this.securityService.login(userObject)
        .subscribe(
          (c: UserAuth) => {
            // this.signalrService.addUser(userInfo);
            this.isLoading = false;
            this.toastr.success('Başarıyla giriş yapıldı');
            // admin-lte issue for side bar https://github.com/ColorlibHQ/AdminLTE/issues/3599

            const userStorage = JSON.parse(localStorage.getItem("authObj"))
            const claimType = userStorage.claims.filter(claim => claim.claimType == "funeral_fund_profile_list");
            const modifiedDate = userStorage.modifiedDate

            if (claimType[0].claimValue == "true") {
              if (modifiedDate != null) {
                this.router.navigate(['funeral-fund-profile']);
              }
              else {
                this.router.navigate(['update-funeral-fund-profile'])
              }
            } else {
              window.location.href = "/";
            }
          },
          (err: CommonError) => {
            this.isLoading = false;
            if (err.messages) {
              err.messages.forEach(msg => {
                this.toastr.error(msg);
              });
            } else if (err.error) {
              this.toastr.error(err.error as string);
            }
          }
        );
    }
  }


  createFormGroup(): void {
    this.loginFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  showLoginForm() {
    this.showForm = 'login';
  }

  showCalculateForm() {
    this.showForm = 'calculate';
  }

  goBack() {
    this.showForm = null;
  }

  calculateFee() {
    const birthYear = this.yearInput.nativeElement.value;
    if (birthYear && birthYear.length === 4) {

      this.isLoadingButton = true;
      const data = '01-01-' + birthYear;

      this.funeralFundService.calculateFee(data).subscribe((resp: any) => {
        if (resp) {
          this.entranceFree = resp?.amount
        }
      },
        (error: any) => {

          this.entranceFree = 0

        }
      );
    } else {
      this.entranceFree = null
    }
  }


}
