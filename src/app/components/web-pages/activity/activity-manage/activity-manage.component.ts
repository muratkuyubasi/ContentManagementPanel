import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ApplicationService } from 'src/app/components/application/application.service';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.css']
})
export class ActivityManageComponent extends BaseComponent implements OnInit {
  list: Activity;
  isLoadingResults = false;
  frontForm: FormGroup;
  isEditMode = false;
  previews: string[] = [];
  isLoadingButton: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private webPagesService: WebPagesService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { id: any }) => {
      const id = params.id;
      if (id) {
        this.isEditMode = true;

        this.getById(id);
      }
    });
    this.createFrontForm()

  }



  createFrontForm() {
    this.frontForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      isActive: [true]
    });
  }


  getById(id: any) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontActivityById(id).subscribe(
        (list: any) => {
          this.frontForm.patchValue(list);
          this.list = list;

        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  save() {
    this.isLoadingButton = true;
    if (this.frontForm.valid) {
      const front = this.frontForm.value;
      if (this.isEditMode) {
        this.sub$.sink = this.webPagesService.updateFrontActivity(front).subscribe(
          (data: any) => {
            if (data) {
              this.toastrService.success(
                this.translationService.getValue('ACTIVITY_UPDATED_SUCCESSFULLY')
              );
              this.isLoadingButton = false;
            }
          },
          (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          }
        );
      } else {

        this.sub$.sink = this.webPagesService
          .addFrontActivity(front)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(
              this.translationService.getValue('ACTIVITY_ADDED_SUCCESSFULLY')
            );
            this.frontForm.reset();
            this.createFrontForm();
            this.previews=[];
          }, (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          });
      }
    } else {
      this.isLoadingButton = false;
      this.frontForm.markAllAsTouched();
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
