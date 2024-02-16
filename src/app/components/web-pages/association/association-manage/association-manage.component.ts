import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Associations } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-association-manage',
  templateUrl: './association-manage.component.html',
  styleUrls: ['./association-manage.component.css']
})
export class AssociationManageComponent extends BaseComponent implements OnChanges {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AssociationManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Associations,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,
  ) {
    super();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEditMode = true;
      }

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveAssociations(): void {
    this.isLoadingButton = true;
    if (this.data.id) {
      this.webPagesService.updateFrontAssociation(this.data).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('ASSOCIATION_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    } else {
      this.webPagesService.addFrontAssociation(this.data).subscribe(() => {
        this.isLoadingButton = false;

        this.toastrService.success(this.translationService.getValue('ASSOCIATION_SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    }
  }





}
