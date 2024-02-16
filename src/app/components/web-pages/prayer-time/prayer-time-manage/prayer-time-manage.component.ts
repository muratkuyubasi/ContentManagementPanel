import { Component, Inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { WebPagesService } from '../../web-pages.service';
import { BaseComponent } from 'src/app/base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prayer-time-manage',
  templateUrl: './prayer-time-manage.component.html',
  styleUrls: ['./prayer-time-manage.component.css']
})
export class PrayerTimeManageComponent extends BaseComponent {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PrayerTimeManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

  save(): void {
    this.isLoadingButton = true;
    if (this.data.id) {
      this.webPagesService.updateFrontCountry(this.data).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
        this.isLoadingButton = false;

      });
    } else {
      this.webPagesService.addFrontCountry(this.data).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
        this.isLoadingButton = false;

      });
    }
  }
}
