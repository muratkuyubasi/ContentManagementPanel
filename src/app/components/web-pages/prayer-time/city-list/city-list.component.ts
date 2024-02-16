import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';
import { CommonError } from '@core/error-handler/common-error';
import { CityManageComponent } from '../city-manage/city-manage.component';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent extends BaseComponent implements OnInit {
  isLoadingResults = false;
  frontForm: FormGroup;
  cities: any[];
  displayedColumns: string[] = ['name', 'longitude', 'latitude', 'action'];
  id: number;
  langcode: string;
  isLoadingButton: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private webPagesService: WebPagesService,
    private commonDialogService: CommonDialogService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { id: number, langcode: string }) => {
      this.id = params.id;
      this.langcode = params.langcode;
      if (this.id) {

        this.createFrontForm(this.id)
        this.getByLangCode(this.langcode);
      }
    });


  }



  createFrontForm(id: number) {
    this.frontForm = this.fb.group({
      countryId: [id],
      name: [''],
      longitude: [''],
      latitude: ['']
    });
  }



  save() {

    if (this.frontForm.valid) {
      const front = this.frontForm.value;
      this.isLoadingButton = true;
      this.sub$.sink = this.webPagesService.addFrontCity(front).subscribe(
        (data: any) => {
          if (data) {
            this.toastrService.success(this.translationService.getValue('ADDED_SUCCESSFULLY'));
            this.isLoadingButton = false;
            this.frontForm.reset();
            this.createFrontForm(this.id);
            this.getByLangCode(this.langcode);
          }
        },
        (error) => {
          this.isLoadingButton = false;

          this.handleHttpError(error);
        }
      );
    } else {
      this.isLoadingButton = false;
      this.frontForm.markAllAsTouched();
    }

  }


  getByLangCode(langcode: string) {
    this.sub$.sink = this.webPagesService.getFrontCountryByLangcode(langcode).subscribe((data: any) => {
      this.cities = data;

    })
  }

  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error(errorMessage);
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }




  delete(data: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${data.name}`)
      .subscribe((resp: any) => {

        if (resp) {
          this.sub$.sink = this.webPagesService.deleteFrontCity(data.id).subscribe(() => {
            this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));

          });

        }

      });
  }

  manage(cities?: any): void {
    const dialogRef = this.dialog.open(CityManageComponent, {
      width: '200px',
      height: '200px',
      data: Object.assign({}, cities)
    });
  }
}
