import { Component, Inject, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dues-manage',
  templateUrl: './dues-manage.component.html',
  styleUrls: ['./dues-manage.component.css']
})
export class DuesManageComponent extends BaseComponent {
 dues:any;
  constructor(
    public dialogRef: MatDialogRef<DuesManageComponent>,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private funeralFundService: FuneralFundService,
    private router:Router
  ) {
    super();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.funeralFundService.updateDues(this.dues).subscribe((res:any) => {
      this.toastrService.success(this.translationService.getValue('DUES_UPDATED_SUCCESSFULLY'));
      this.dialogRef.close();
    });

  }

}
