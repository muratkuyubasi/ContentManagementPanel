import { FuneralFundManageComponent } from './funeral-fund-manage/funeral-fund-manage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuneralFundListComponent } from './funeral-fund-list/funeral-fund-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { FuneralFundDetailComponent } from './funeral-fund-detail/funeral-fund-detail.component';
import { FuneralFundEditComponent } from './funeral-fund-edit/funeral-fund-edit.component';
import { FeesListComponent } from './fees/fees-list/fees-list.component';
import { ApproveListComponent } from './approve-application/approve-list/approve-list.component';
import { ApproveDetailComponent } from './approve-application/approve-detail/approve-detail.component';
import { FuneralFundEditAddressComponent } from './funeral-fund-edit-address/funeral-fund-edit-address.component';
import { FuneralFundAddPersonComponent } from './funeral-fund-add-person/funeral-fund-add-person.component';
import { DeletedMembersListComponent } from './deleted-members/deleted-members-list/deleted-members-list.component';
import { SpecificationComponent } from '../login/specification/specification.component';
import { BillsListComponent } from './bills/bills-list/bills-list.component';
import { DeceasedMembersListComponent } from './deceased-members/deceased-members-list/deceased-members-list.component';
import { DeceasedMembersManageComponent } from './deceased-members/deceased-members-manage/deceased-members-manage.component';
import { DeletedFamilyListComponent } from './deleted-members/deleted-family-list/deleted-family-list.component';


const routes: Routes = [
  {
    path: '',
    component: FuneralFundListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard]

  },
  {
    path: 'manage',
    component: FuneralFundManageComponent,
    data: { claimType: 'funeral_fund_add' },
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'edit/:familyId',
    component: FuneralFundEditComponent,
    data: { claimType: 'funeral_fund_edit' },
    canActivate: [AuthGuard],

  },
  {
    path: 'add-person/:familyId',
    component: FuneralFundAddPersonComponent,
    data: { claimType: 'funeral_fund_add' },
    canActivate: [AuthGuard],

  }
  ,
  {
    path: 'edit-address/:familyId',
    component: FuneralFundEditAddressComponent,
    data: { claimType: 'funeral_fund_edit' },
    canActivate: [AuthGuard]

  }
  ,
  {
    path: 'detail/:familyId',
    component: FuneralFundDetailComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard]


  }
  ,
  {
    path: 'fees',
    component: FeesListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard]
  },
  {
    path: 'approve-list',
    component: ApproveListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'approve-detail/:familyId',
    component: ApproveDetailComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard],

  }
  ,
  {
    path: 'deleted-members',
    component: DeletedMembersListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'deleted-families',
    component: DeletedFamilyListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'bills',
    component: BillsListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'deceased-members',
    component: DeceasedMembersListComponent,
    data: { claimType: 'funeral_fund_list' },
    canActivate: [AuthGuard],
  }

  ,
  {
    path: 'deceased-members-manage/:id/:memberId',
    component: DeceasedMembersManageComponent,
    data: { claimType: 'funeral_fund_edit' },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuneralFundRoutingModule { }
