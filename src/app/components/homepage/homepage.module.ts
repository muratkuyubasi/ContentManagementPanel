import { HomepageComponent } from './homepage.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NgApexchartsModule,
    SharedModule,


 
  ]
})
export class HomepageModule { }
