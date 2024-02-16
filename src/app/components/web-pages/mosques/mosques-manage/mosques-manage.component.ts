import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Mosque } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';
import { ApplicationService } from 'src/app/components/application/application.service';

@Component({
  selector: 'app-mosques-manage',
  templateUrl: './mosques-manage.component.html',
  styleUrls: ['./mosques-manage.component.css']
})
export class MosquesManageComponent extends BaseComponent implements OnInit {
  list: Mosque[] = [];
  isLoadingResults = false;
  frontForm: FormGroup;
  isEditMode = false;
  previews: string[] = [];
  ckeditorContent: string;
  isLoadingButton: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private webPagesService: WebPagesService,
    private applicationService: ApplicationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMosque();
    this.createFrontForm()

  }

  getMosque() {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { id: any }) => {
      const id = params.id;
      if (id) {
        this.isEditMode = true;
        this.getById(id);
      }
    });
  }

  createFrontForm() {
    this.frontForm = this.fb.group({
      id: [''],
      image: [''],
      name: [''],
      address: [''],
      phoneNumber: [''],
      ownerShip: [''],
      imamFullName: [''],
      explanationAboutMosque: ['']
    });
  }


  getById(id: any) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontMosqueById(id).subscribe(
        (list: Mosque[]) => {
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
        this.sub$.sink = this.webPagesService.updateFrontMosque(front).subscribe(
          (data: any) => {
            if (data) {
              this.isLoadingButton = false;
              this.toastrService.success(
                this.translationService.getValue('MOSQUE_UPDATED_SUCCESSFULLY')
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
          .addFrontMosque(front)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(this.translationService.getValue('MOSQUE_ADDED_SUCCESSFULLY'));
            this.frontForm.reset();
            this.createFrontForm();
            this.previews=[];
          }, (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          });
      }
    } else {
      this.frontForm.markAllAsTouched();
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
            this.frontForm.patchValue({ image: resp })

          },
          (error: any) => {

          }
        );


    };

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
