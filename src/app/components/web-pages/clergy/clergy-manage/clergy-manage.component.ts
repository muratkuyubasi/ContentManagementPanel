import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Clergy, Mosque } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ApplicationService } from 'src/app/components/application/application.service';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-clergy-manage',
  templateUrl: './clergy-manage.component.html',
  styleUrls: ['./clergy-manage.component.css']
})
export class ClergyManageComponent extends BaseComponent implements OnInit {
  list: Clergy;
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
    private applicationService: ApplicationService
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
      image: [''],
      name: [''],
      surname: [''],
      jobDescription: [''],
      placeOfDuty: ['']
    });
  }


  getById(id: any) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontClergyById(id).subscribe(
        (list: Clergy) => {
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
        this.sub$.sink = this.webPagesService.updateFrontClergy(front).subscribe(

          (data: any) => {
            this.isLoadingButton = false;
            if (data) {
              this.toastrService.success(
                this.translationService.getValue('CLERGY_UPDATED_SUCCESSFULLY')
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
          .addFrontClergy(front)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(this.translationService.getValue('CLERGY_ADDED_SUCCESSFULLY'));
            this.frontForm.reset();
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
      // console.log('dosya görüntü',_event.target.result);
      const file: any = {
        FormFile: selectedFile

      };

      // console.log('file', file);

      const mimeType = selectedFile.type;
      // console.log('file event', mimeType);
      if (!mimeType.match(/image\/*/)) {
        return;
      }

      const formData = new FormData();
      formData.append('FormFile', selectedFile);
      // console.log('Dosya verisi:', formData);
      this.applicationService.addFile(formData)
        .subscribe(
          (resp: any) => {
            this.frontForm.patchValue({ image: resp })
            // console.log('Api yanıtı:', resp);
          },
          (error: any) => {
            // console.error('Api çağrısında hata:', error);
          }
        );


    };

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
