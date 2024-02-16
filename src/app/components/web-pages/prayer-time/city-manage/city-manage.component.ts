import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-city-manage',
  templateUrl: './city-manage.component.html',
  styleUrls: ['./city-manage.component.css']
})
export class CityManageComponent extends BaseComponent implements OnChanges {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<CityManageComponent>,
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
      this.webPagesService.updateFrontCity(this.data).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    } else {
      this.webPagesService.addFrontCity(this.data).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    }
  }


  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error(errorMessage);
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

}
