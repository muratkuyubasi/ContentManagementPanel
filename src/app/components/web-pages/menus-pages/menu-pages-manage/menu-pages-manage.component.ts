import { FrontPageRecords } from '../../../../core/domain-classes/web-pages';
import { ApplicationService } from '../../../application/application.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { FrontPage } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { WebPagesService } from '../../web-pages.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-menu-pages-manage',
  templateUrl: './menu-pages-manage.component.html',
  styleUrls: ['./menu-pages-manage.component.css']
})
export class MenuPagesManageComponent extends BaseComponent implements OnInit {
  pagesList: FrontPage[] = [];
  isLoadingResults = false;
  frontPageForm: FormGroup;
  isEditMode = false;
  frontPage: any
  previews: string[] = [];
  ckeditorContent: string;
  isLoadingButton: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private webPagesService: WebPagesService,
    private applicationService: ApplicationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { code: string }) => {
      const code = params.code;
      if (code) {
        this.isEditMode = true;

        this.getFrontPageById(code);
      }
    });
    this.createfrontPageForm();
  }



  createfrontPageForm() {
    this.frontPageForm = this.fb.group({
      id: [0],
      code: [''],
      isActive: true,
      frontPageRecords: this.fb.array([this.createFrontPageRecords()])
    });
  }

  createFrontPageRecords() {
    return this.fb.group({
      id: [0],
      code: [''],
      frontPageId: [0],
      name: ['', Validators.required],
      pageContent: [''],
      fileUrl: [''],
      languageCode: ['tr']
    })

  }

  createBuildObject(): any {
    const addFrontPage: any = {
      isActive: this.frontPageForm.get('isActive').value,
      frontPageRecords: []
    };

    const frontPageRecordsArray = this.frontPageForm.get('frontPageRecords') as FormArray;
    frontPageRecordsArray.controls.forEach((control: FormGroup) => {
      const frontPageRecord = {
        name: control.get('name').value,
        pageContent: control.get('pageContent').value,
        fileUrl: control.get('fileUrl').value,
        languageCode: "tr"
      };
      addFrontPage.frontPageRecords.push(frontPageRecord);
    });

    return addFrontPage;
  }


  get frontPageRecords(): FormArray {
    return this.frontPageForm.get('frontPageRecords') as FormArray;
  }

  addfrontPageRecords() {
    this.frontPageRecords.push(this.createfrontPageForm());
  }


  getFrontPageById(code: string) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontPageById(code).subscribe(
        (pagesList: FrontPage[]) => {
          this.frontPageForm.patchValue(pagesList);
          this.pagesList = pagesList;

        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  uploadFileEvent($event) {
    const selectedFile = $event.target.files[0];
    this.previews = [];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onload = (_event) => {
      this.previews.push(_event.target.result.toString());

      const file: any = {
        FormFile: selectedFile

      };

      const mimeType = selectedFile.type;

      if (!mimeType.match(/image\/*/)) {
        return;
      }

      const formData = new FormData();
      formData.append('FormFile', selectedFile);

      this.applicationService.addFile(formData)
        .subscribe(
          (resp: any) => {
            this.frontPageRecords.controls[0].get('fileUrl').patchValue(resp)

          }
        );
    };
  }

  saveFrontPage() {
    this.isLoadingButton = true;
    if (this.frontPageForm.valid) {
      const frontPage = this.frontPageForm.value;
      const pageadd = this.createBuildObject();
      if (this.isEditMode) {
        this.sub$.sink = this.webPagesService.updateFrontPage(frontPage).subscribe(
          (data: any) => {
            if (data) {
              this.isLoadingButton = false;
              this.toastrService.success(
                this.translationService.getValue('PAGE_UPDATED_SUCCESSFULLY')
              );
            }
          },
          (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          }
        );
      } else {
        this.sub$.sink = this.webPagesService
          .addFrontPage(pageadd)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(
              this.translationService.getValue('PAGE_ADDED_SUCCESSFULLY')
            );
            this.frontPageForm.reset();
            this.createfrontPageForm();
            this.previews=[];

          }, (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          });
      }
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
