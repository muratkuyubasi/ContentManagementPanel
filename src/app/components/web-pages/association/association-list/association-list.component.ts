import { AssociationManageComponent } from './../association-manage/association-manage.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Associations } from '@core/domain-classes/web-pages';
import { CommonError } from '@core/error-handler/common-error';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { AirportManageComponent } from '../../airport/airport-manage/airport-manage.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css']
})
export class AssociationListComponent extends BaseComponent {
  isLoadingResults = false;
  associations: Associations[];
  displayedColumns: string[] = ['title', 'action'];
  isLoadingButton: boolean[] = [];

  constructor(
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,
    private dialog: MatDialog,
  ) {
    super();

  }

  ngOnInit(): void {
    this.getAssociations();
  }

  getAssociations(): void {
    this.isLoadingResults = true;
    this.webPagesService.getFrontAllAssociation()
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.associations = data;
        },
        (err: CommonError) => {
          err.messages.forEach(msg => {
            this.toastrService.error(msg);
          });
        }
      );
  }

  deleteAssociations(associations: Associations, i) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${associations.name}`)
      .subscribe((resp: any) => {

        this.isLoadingButton[i] = !this.isLoadingButton[i];
        if (resp == true) {
          this.sub$.sink = this.webPagesService.deleteFrontAssociations(associations.id).subscribe(() => {
            this.toastrService.success(this.translationService.getValue('ASSOCIATION_DELETED_SUCCESSFULLY'));
            this.isLoadingButton[i] = !this.isLoadingButton[i];
            this.getAssociations();
          });

        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }

      });
  }

  manageAirport(associations?: Associations): void {
    const dialogRef = this.dialog.open(AssociationManageComponent, {
      width: '300px',
      height: '200px',
      data: Object.assign({}, associations)
    });
    this.sub$.sink = dialogRef.afterClosed()
      .subscribe(result => {
        this.getAssociations();
      });


  }
}
