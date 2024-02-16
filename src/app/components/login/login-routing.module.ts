import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { SpecificationComponent } from './specification/specification.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
  ,
  {
    path: 'specification',component: SpecificationComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
