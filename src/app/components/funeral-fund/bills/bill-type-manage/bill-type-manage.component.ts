import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { BillsManageComponent } from '../bills-manage/bills-manage.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-type-manage',
  templateUrl: './bill-type-manage.component.html',
  styleUrls: ['./bill-type-manage.component.css']
})
export class BillTypeManageComponent extends BaseComponent implements OnInit {
  isLoadingButton: boolean = false;
  billTypeForm: UntypedFormGroup;
  isEditMode: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<BillsManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private funeralFundService: FuneralFundService,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createBillTypeForm();
    if (this.data?.id) {
      this.billTypeForm.patchValue(this.data)
      this.isEditMode = true;

    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }


  createBillTypeForm() {
    this.billTypeForm = this.formBuilder.group({
      id: [this.data.id],
      name: ['', Validators.required],
    })
  }

  save(): void {
    this.isLoadingButton = true;
    if (this.data.id) {
      this.funeralFundService.updateDebtorType(this.billTypeForm.value).subscribe((data: any) => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
        this.router.navigate(['funeral-fund/fees']);
        this.dialogRef.close();


      })
    } else {
      this.funeralFundService.addDebtorType(this.billTypeForm.value).subscribe((data: any) => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('SAVED_SUCCESSFULLY'));
        this.router.navigate(['funeral-fund/fees']);
        this.dialogRef.close();


      });
    }

  }



}
