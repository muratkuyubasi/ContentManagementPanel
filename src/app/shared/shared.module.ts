import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HasClaimDirective } from './has-claim.directive';
import { PipesModule } from './pipes/pipes.module';
import { DragDropDirective } from './directives/drag-drop.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { IdentificationFormatDirective } from './directives/identification-format.directive';



@NgModule({
  exports: [
    HasClaimDirective,
    PipesModule,
    TranslateModule,
    DragDropDirective,
    BreadcrumbComponent,
    IdentificationFormatDirective,


  ],
  imports: [PipesModule,TranslateModule],
  declarations: [HasClaimDirective, DragDropDirective, BreadcrumbComponent,IdentificationFormatDirective],
})
export class SharedModule { }
