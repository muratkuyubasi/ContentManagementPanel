import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { PageListComponent } from './page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
    data: { claimType: 'page_list' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
