import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { HomepageComponent } from './homepage.component';
import { NgApexchartsModule } from "ng-apexcharts";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),NgApexchartsModule],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
