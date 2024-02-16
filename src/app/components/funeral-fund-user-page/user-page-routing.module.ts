import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "@core/security/auth.guard";
import { UserPageComponent } from "./user-page/user-page.component";


const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    canActivate: [AuthGuard]

  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
