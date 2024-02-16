import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';

@Component({
  selector: 'app-fees-manage',
  templateUrl: './fees-manage.component.html',
  styleUrls: ['./fees-manage.component.css']
})
export class FeesManageComponent extends BaseComponent implements OnChanges {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FeesManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private funeralFundService: FuneralFundService,
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
      this.funeralFundService.updateAge(this.data).subscribe((data: any) => {
        if (data.success == true) {
          this.isLoadingButton = false;
          this.toastrService.success(this.translationService.getValue('FEE_UPDATED_SUCCESSFULLY'));
          this.dialogRef.close();
        }
        else {
          this.isLoadingButton = false;
          this.toastrService.error(data.errors[0]);
        }

      });
    } else {
      this.funeralFundService.addAge(this.data).subscribe((data: any) => {
        if (data.success == true) {
          this.isLoadingButton = false;
          this.toastrService.success(this.translationService.getValue('FEE_SAVED_SUCCESSFULLY'));
          this.dialogRef.close();
        }
        else {
          this.isLoadingButton = false;

          this.toastrService.error(data.errors[0]);
        }

      })
    }
    (error: any) => {
      this.isLoadingButton = false;

      this.handleHttpError(error);
    }
  }


  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

}
