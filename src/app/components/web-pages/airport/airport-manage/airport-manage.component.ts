import { TranslationService } from '@core/services/translation.service';
import { WebPagesService } from './../../web-pages.service';
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { departments } from '@core/domain-classes/departments';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from '@ngrx/store';
import { Airports } from '@core/domain-classes/web-pages';

@Component({
  selector: 'app-airport-manage',
  templateUrl: './airport-manage.component.html',
  styleUrls: ['./airport-manage.component.css']
})
export class AirportManageComponent extends BaseComponent implements OnChanges {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<AirportManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Airports,
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

  saveAirports(): void {
    this.isLoadingButton = true;
    if (this.data.id) {

      this.webPagesService.updateFrontAirport(this.data).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('AIRPORT_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    } else {
      this.webPagesService.addFrontAirport(this.data).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('AIRPORT_SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    }
  }


}
