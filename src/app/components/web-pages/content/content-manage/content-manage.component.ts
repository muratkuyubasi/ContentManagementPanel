import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Announcement } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ApplicationService } from 'src/app/components/application/application.service';
import { WebPagesService } from '../../web-pages.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-content-manage',
  templateUrl: './content-manage.component.html',
  styleUrls: ['./content-manage.component.css']
})
export class ContentManageComponent extends BaseComponent implements OnInit {
  announcementList: Announcement;
  isLoadingResults = false;
  frontAnnouncementForm: FormGroup;
  isEditMode = false;
  previews: string[] = [];
  ckeditorContent: string;
  frontAnnouncement: any;
  photoUrl: string = environment.apiUrl;
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
        this.getAnnouncementById(code);
      }
    });
    this.createFrontAnnouncementForm();


  }



  createFrontAnnouncementForm() {
    this.frontAnnouncementForm = this.fb.group({
      id: [0],
      code: [''],
      order: [0],
      isSlider: [false],
      isNews: [false],
      isAnnouncement: [false],
      isActive: [true],
      frontAnnouncementRecords: this.fb.array([this.createFrontAnnouncementRecords()])
    });
  }

  createFrontAnnouncementRecords() {
    return this.fb.group({
      id: [0],
      frontAnnouncementId: [0],
      title: [''],
      shortDescription: [''],
      longDescription: [''],
      fileUrl: [''],
      languageCode: ['tr']
    })

  }

  get frontAnnouncementRecords(): FormArray {
    return this.frontAnnouncementForm.get('frontAnnouncementRecords') as FormArray;
  }

  addfrontAnnouncementRecords() {
    this.frontAnnouncementRecords.push(this.createFrontAnnouncementRecords());
  }

  getAnnouncementById(code) {
    this.sub$.sink = this.webPagesService.getFrontAnnouncementByCode(code).subscribe((data: any) => {
      this.announcementList = data;
      this.frontAnnouncementForm.patchValue(this.announcementList);

    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
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
            this.frontAnnouncementRecords.controls[0].get('fileUrl').patchValue(resp)

          },
          (error: any) => {

          }
        );


    };

  }

  saveFrontAnnouncement() {
    this.isLoadingButton = true;
    if (this.frontAnnouncementForm.valid) {
      const frontAnnouncement = this.frontAnnouncementForm.value;

      if (this.isEditMode) {
        this.sub$.sink = this.webPagesService.updateFrontAnnouncement(frontAnnouncement).subscribe(
          (data: any) => {
            this.isLoadingButton = false;
            if (data) {
              this.toastrService.success(
                this.translationService.getValue('CONTENT_UPDATED_SUCCESSFULLY')
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
          .addFrontAnnouncement(frontAnnouncement)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(
              this.translationService.getValue('CONTENT_ADDED_SUCCESSFULLY')
            );
            this.frontAnnouncementForm.reset();
            this.createFrontAnnouncementForm();
            this.previews=[];

          }, (error) => {
            this.isLoadingButton = false;

            this.handleHttpError(error);
          });
      }
    } else {
      this.isLoadingButton = false;
      this.frontAnnouncementForm.markAllAsTouched();
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
