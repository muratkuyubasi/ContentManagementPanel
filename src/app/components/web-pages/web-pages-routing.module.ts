import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { MenusListComponent } from './menus/menus-list/menus-list.component';
import { MenusManageComponent } from './menus/menus-manage/menus-manage.component';
import { MenuPagesManageComponent } from './menus-pages/menu-pages-manage/menu-pages-manage.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentManageComponent } from './content/content-manage/content-manage.component';
import { MenuPagesComponent } from './menus-pages/menu-pages/menu-pages.component';
import { AirportListComponent } from './airport/airport-list/airport-list.component';
import { AssociationListComponent } from './association/association-list/association-list.component';
import { RoomTypeListComponent } from './room-type/room-type-list/room-type-list.component';
import { MosquesManageComponent } from './mosques/mosques-manage/mosques-manage.component';
import { MosquesListComponent } from './mosques/mosques-list/mosques-list.component';
import { FoundationPublicationListComponent } from './foundation-publication/foundation-publication-list/foundation-publication-list.component';
import { FoundationPublicationManageComponent } from './foundation-publication/foundation-publication-manage/foundation-publication-manage.component';
import { ServiceListComponent } from './front-service/service-list/service-list.component';
import { ServiceManageComponent } from './front-service/service-manage/service-manage.component';
import { ClergyListComponent } from './clergy/clergy-list/clergy-list.component';
import { ClergyManageComponent } from './clergy/clergy-manage/clergy-manage.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { ActivityManageComponent } from './activity/activity-manage/activity-manage.component';
import { PrayerTimeListComponent } from './prayer-time/prayer-time-list/prayer-time-list.component';
import { PrayerTimeManageComponent } from './prayer-time/prayer-time-manage/prayer-time-manage.component';
import { CityListComponent } from './prayer-time/city-list/city-list.component';
import { LogoListComponent } from './logo-change/logo-list/logo-list.component';


const routes: Routes = [
  {
    path: '',
    component: MenusListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:code',
    component: MenusManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'manage',
    component: MenusManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    component: MenuPagesComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages/manage',
    component: MenuPagesManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages/manage/:code',
    component: MenuPagesManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'content',
    component: ContentListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'content/manage/:code',
    component: ContentManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'content/manage',
    component: ContentManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'airport',
    component: AirportListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'association',
    component: AssociationListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'roomType',
    component: RoomTypeListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'mosque',
    component: MosquesListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'mosque/manage/:id',
    component: MosquesManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'mosque/manage',
    component: MosquesManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'publication',
    component: FoundationPublicationListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'publication/manage/:id',
    component: FoundationPublicationManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'publication/manage',
    component: FoundationPublicationManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'service',
    component: ServiceListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'service/manage/:id',
    component: ServiceManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'service/manage',
    component: ServiceManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'clergy',
    component: ClergyListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'clergy/manage/:id',
    component: ClergyManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'clergy/manage',
    component: ClergyManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'activity',
    component: ActivityListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/manage/:id',
    component: ActivityManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/manage',
    component: ActivityManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'prayer-time',
    component: PrayerTimeListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'prayer-time/manage/:id',
    component: PrayerTimeManageComponent,
    data: { claimType: 'menus_edit' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'prayer-time/manage',
    component: PrayerTimeManageComponent,
    data: { claimType: 'menus_add' }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'city/:id/:langcode',
    component: CityListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'logo',
    component: LogoListComponent,
    data: { claimType: 'menus_list' }, 
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPagesRoutingModule { }
