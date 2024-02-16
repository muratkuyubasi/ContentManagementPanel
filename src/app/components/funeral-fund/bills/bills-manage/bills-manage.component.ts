import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-bills-manage',
  templateUrl: './bills-manage.component.html',
  styleUrls: ['./bills-manage.component.css']
})
export class BillsManageComponent extends BaseComponent implements OnInit {
  isLoadingButton: boolean = false;
  billsForm: UntypedFormGroup;
  isEditMode: boolean = false;
  debtorType: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<BillsManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private funeralFundService: FuneralFundService,
    private toastrService: ToastrService,
    private translationService: TranslationService,
  ) {
    super();
  }



  ngOnInit(): void {

    this.createBillsForm();
    this.getAllDebtorTypes();
    if (this.data.debtor) {
      this.isEditMode = true;
      this.billsForm.get('amount').setValue(this.data.debtor.amount);
      const date = moment(this.data.debtor.dueDate).format('yyyy-MM-DD');
      this.billsForm.get('dueDate').setValue(date);
      this.billsForm.get('debtorTypeId').setValue(this.data.debtor.debtorTypeId);
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }

  getAllDebtorTypes() {
    this.sub$.sink = this.funeralFundService.getAllDebtorTypes().subscribe((data: any) => {
      this.debtorType = data
    })
  }

  createBillsForm() {
    this.billsForm = this.formBuilder.group({
      debtorNumber: this.data?.debtor?.debtorNumber,
      familyId: this.data?.familyId,
      amount: [''],
      dueDate: [''],
      debtorTypeId: ['']
    })
  }

  save(): void {
    
    this.isLoadingButton = true;

    if (this.isEditMode) {
      this.funeralFundService.updateBills(this.billsForm.value).subscribe((data) => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();

      });
      
    }
    else {
      this.funeralFundService.addBills(this.billsForm.value).subscribe(() => {
        this.isLoadingButton = false;
        this.toastrService.success(this.translationService.getValue('SAVED_SUCCESSFULLY'));
        this.dialogRef.close();

      });
    }

  }



}


