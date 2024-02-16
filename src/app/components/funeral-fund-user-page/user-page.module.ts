import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { OldUserComponent } from './old-user/old-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [UserPageComponent, OldUserComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule





  ]
})
export class UserPageModule { }
