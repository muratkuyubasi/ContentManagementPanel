
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
// import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { LayoutComponent } from '@core/layout/layout.component';
import { AuthGuard } from '@core/security/auth.guard';
import { OldUserComponent } from './components/funeral-fund-user-page/old-user/old-user.component';
import { RegisterComponent } from './components/login/register/register.component';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module')
        .then(m => m.LoginModule)
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'update-funeral-fund-profile',
    component: OldUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'actions',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/action/action.module')
            .then(m => m.ActionModule)
      },
      {
        path: 'pages',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/page/page.module')
            .then(m => m.PageModule)
      },
      {
        path: 'page-action',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/page-action/page-action.module')
            .then(m => m.PageActionModule)
      },
      {
        path: 'roles',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/role/role.module')
            .then(m => m.RoleModule)
      }, {
        path: 'users',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/user/user.module')
            .then(m => m.UserModule)
      }, {
        path: 'login-audit',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/login-audit/login-audit.module')
            .then(m => m.LoginAuditModule)
      },
      {
        path: 'sessions',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/session/session.module')
            .then(m => m.SessionModule)
      },
      {
        path: 'appsettings',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/app-settings/app-settings.module')
            .then(m => m.AppSettingsModule)
      },
      {
        path: 'email-template',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/email-template/email-template.module')
            .then(m => m.EmailTemplateModule)
      },
      {
        path: 'send-email',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/email-send/email-send.module')
            .then(m => m.EmailSendModule)
      },
      {
        path: 'logs',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/n-log/n-log.module')
            .then(m => m.NLogModule)
      },
      {
        path: 'email-smtp',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/email-smtp-setting/email-smtp-setting.module')
            .then(m => m.EmailSmtpSettingModule)
      }
      ,
      {
        path: 'funeral-fund',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/funeral-fund/funeral-fund.module')
            .then(m => m.FuneralFundModule)
      },
      {
        path: 'application',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/application/application.module')
            .then(m => m.ApplicationModule)
      },
      {
        path: 'menus',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/web-pages/web-pages.module')
            .then(m => m.WebPagesModule)
      },
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/homepage/homepage.module')
            .then(m => m.HomepageModule)
      },
      {
        path: 'funeral-fund-profile',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./components/funeral-fund-user-page/user-page.module')
            .then(m => m.UserPageModule)
      }

      // {
      //   path:'menus',
      //   canLoad:[AuthGuard],
      //   loadChildren:() =>
      //   import('./components/front/front.module').then(m=>m.FrontModule)
      // },



      // {
      //   path: '**',
      //   redirectTo: '/'
      // },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }