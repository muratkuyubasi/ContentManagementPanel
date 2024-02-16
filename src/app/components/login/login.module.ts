import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { SpecificationComponent } from './specification/specification.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '@shared/shared.module';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SpecificationComponent,

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgxIntlTelInputModule,
    SharedModule
  ]
})
export class LoginModule { }
