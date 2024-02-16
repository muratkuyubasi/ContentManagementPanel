import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuneralFundRoutingModule } from './funeral-fund-routing.module';
import { FuneralFundListComponent } from './funeral-fund-list/funeral-fund-list.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from '../user/user-routing.module';
import { FuneralFundManageComponent } from './funeral-fund-manage/funeral-fund-manage.component';
import { FuneralFundDetailComponent } from './funeral-fund-detail/funeral-fund-detail.component';

import { FuneralFundEditComponent } from './funeral-fund-edit/funeral-fund-edit.component';
import { FeesListComponent } from './fees/fees-list/fees-list.component';
import { FeesManageComponent } from './fees/fees-manage/fees-manage.component';
import { DuesManageComponent } from './fees/dues-manage/dues-manage.component';
import { ApproveListComponent } from './approve-application/approve-list/approve-list.component';
import { ApproveDetailComponent } from './approve-application/approve-detail/approve-detail.component';
import { FuneralFundEditAddressComponent } from './funeral-fund-edit-address/funeral-fund-edit-address.component';
import { FuneralFundAddPersonComponent } from './funeral-fund-add-person/funeral-fund-add-person.component';
import { DeletedMembersListComponent } from './deleted-members/deleted-members-list/deleted-members-list.component';
import { DeceasedMembersManageComponent } from './deceased-members/deceased-members-manage/deceased-members-manage.component';
import { BillsListComponent } from './bills/bills-list/bills-list.component';
import { DeceasedMembersListComponent } from './deceased-members/deceased-members-list/deceased-members-list.component';
import { FuneralFundManageDivorceComponent } from './funeral-fund-manage-divorce/funeral-fund-manage-divorce.component';
import { BillsManageComponent } from './bills/bills-manage/bills-manage.component';
import { BillTypeManageComponent } from './bills/bill-type-manage/bill-type-manage.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DeletedFamilyListComponent } from './deleted-members/deleted-family-list/deleted-family-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FuneralFundListComponent, FuneralFundManageComponent, FuneralFundDetailComponent, FuneralFundEditComponent, FeesListComponent, FeesManageComponent, DuesManageComponent, ApproveListComponent, ApproveDetailComponent, FuneralFundEditAddressComponent, FuneralFundAddPersonComponent, DeletedMembersListComponent, DeceasedMembersManageComponent, BillsListComponent, DeceasedMembersListComponent, FuneralFundManageDivorceComponent, BillsManageComponent, BillTypeManageComponent,
    DeletedFamilyListComponent],
  imports: [
    CommonModule,
    FuneralFundRoutingModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    NgxIntlTelInputModule,
    HttpClientModule,




  ]
  ,
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FuneralFundModule { }
