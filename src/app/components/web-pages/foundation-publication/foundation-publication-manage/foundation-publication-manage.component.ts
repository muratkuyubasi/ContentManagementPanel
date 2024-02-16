import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { FoundationPublication } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ApplicationService } from 'src/app/components/application/application.service';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-foundation-publication-manage',
  templateUrl: './foundation-publication-manage.component.html',
  styleUrls: ['./foundation-publication-manage.component.css']
})
export class FoundationPublicationManageComponent extends BaseComponent implements OnInit {
  list: FoundationPublication;
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
      subtitle: [''],
      description: ['']
    });
  }


  getById(id: any) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontPublicationById(id).subscribe(
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
        this.sub$.sink = this.webPagesService.updateFrontPublication(front).subscribe(
          (data: any) => {
            if (data) {
              this.isLoadingButton = false;

              this.toastrService.success(
                this.translationService.getValue('PUBLICATION_UPDATED_SUCCESSFULLY')
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
          .addFrontPublication(front)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(this.translationService.getValue('PUBLICATION_ADDED_SUCCESSFULLY'));
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
      this.toastrService.error(errorMessage);
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
}
