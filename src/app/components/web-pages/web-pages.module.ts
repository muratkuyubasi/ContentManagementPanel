import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebPagesRoutingModule } from './web-pages-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MenusListComponent } from './menus/menus-list/menus-list.component';
import { MenusManageComponent } from './menus/menus-manage/menus-manage.component';
import { MenuPagesManageComponent } from './menus-pages/menu-pages-manage/menu-pages-manage.component';
import { NgxEditorModule } from 'ngx-editor';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentManageComponent } from './content/content-manage/content-manage.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MenuPagesComponent } from './menus-pages/menu-pages/menu-pages.component';
import { AirportListComponent } from './airport/airport-list/airport-list.component';
import { AirportManageComponent } from './airport/airport-manage/airport-manage.component';
import { AssociationListComponent } from './association/association-list/association-list.component';
import { AssociationManageComponent } from './association/association-manage/association-manage.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RoomTypeListComponent } from './room-type/room-type-list/room-type-list.component';
import { RoomTypeManageComponent } from './room-type/room-type-manage/room-type-manage.component';
import { MosquesListComponent } from './mosques/mosques-list/mosques-list.component';
import { MosquesManageComponent } from './mosques/mosques-manage/mosques-manage.component';
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
import { CityManageComponent } from './prayer-time/city-manage/city-manage.component';

import { CityListComponent } from './prayer-time/city-list/city-list.component';
import { LogoListComponent } from './logo-change/logo-list/logo-list.component';
import { LogoManageComponent } from './logo-change/logo-manage/logo-manage.component';



@NgModule({
  declarations: [
    MenusListComponent,
    MenusManageComponent,
    MenuPagesComponent,
    MenuPagesManageComponent,
    ContentListComponent,
    ContentManageComponent,
    AirportListComponent,
    AirportManageComponent,
    AssociationListComponent,
    AssociationManageComponent,
    RoomTypeListComponent,
    RoomTypeManageComponent,
    MosquesListComponent,
    MosquesManageComponent,
    FoundationPublicationListComponent,
    FoundationPublicationManageComponent,
    ServiceListComponent,
    ServiceManageComponent,
    ClergyListComponent,
    ClergyManageComponent,
    ActivityListComponent,
    ActivityManageComponent,
    PrayerTimeListComponent,
    PrayerTimeManageComponent,
    CityManageComponent,
    CityListComponent,
    LogoListComponent,
    LogoManageComponent,


  ],
  imports: [
    CommonModule,
    WebPagesRoutingModule,
    TranslateModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSlideToggleModule,
    NgxEditorModule,
    CKEditorModule,
    MatSelectModule,
    MatDialogModule

  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class WebPagesModule { }
