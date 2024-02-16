import { FrontMenuRecords, FrontPageRecords } from '../../../../core/domain-classes/web-pages';
import { WebPagesService } from './../../web-pages.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrontMenu } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-menus-manage',
  templateUrl: './menus-manage.component.html',
  styleUrls: ['./menus-manage.component.css']
})
export class MenusManageComponent extends BaseComponent implements OnInit {
  menusList: FrontMenu[] = [];
  pagesList: FrontPageRecords[] = [];
  isLoadingResults = false;
  frontMenuForm: FormGroup;
  isEditMode = false;
  frontMenu: any
  pages: any[] = []
  mainMenus: any = [] = []
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
    this.sub$.sink = this.activeRoute.params.subscribe((params: { code: string }) => {
      const code = params.code;
      if (code) {
        this.isEditMode = true;

        this.getFrontMenuById(code);
      }
    });
    this.createFrontMenuForm();
    this.getAllFrontMenus();
    this.getAllFrontPages();

  }



  createFrontMenuForm() {
    this.frontMenuForm = this.fb.group({
      id: [''],
      order: [1],
      code: [''],
      url: [''],
      isActive: [true],
      parentId: [''],
      frontPageId: [''],
      frontMenuRecords: this.fb.array([this.createFrontMenuRecords()])
    });
  }

  createFrontMenuRecords() {
    return this.fb.group({
      id: [0],
      frontMenuId: [0],
      name: [''],
      slug: [''],
      languageCode: ['tr'],

    })

  }

  get frontMenuRecords(): FormArray {
    return this.frontMenuForm.get('frontMenuRecords') as FormArray;
  }

  addfrontMenuRecords() {
    this.frontMenuRecords.push(this.createFrontMenuForm());
  }

  getAllFrontMenus() {
    this.sub$.sink = this.webPagesService.getAllFrontMenu().subscribe((data: any) => {
      this.menusList = data;


    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }

  getAllFrontPages() {
    this.sub$.sink = this.webPagesService.getAllFrontPageRecord().subscribe((data: any) => {
      this.pagesList = data;


    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }




  getFrontMenuById(code: string) {
    if (this.isEditMode) {
      this.sub$.sink = this.webPagesService.getFrontMenuById(code).subscribe(
        (menusList: FrontMenu[]) => {

          this.frontMenuForm.patchValue(menusList);
          this.frontMenuForm.patchValue(FrontMenuRecords[0].code)
          this.menusList = menusList;

        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  saveFrontMenu() {
    this.isLoadingButton = true;
    if (this.frontMenuForm.valid) {
      const frontMenu = this.frontMenuForm.value;

      if (this.isEditMode) {
        this.sub$.sink = this.webPagesService.updateFrontMenu(frontMenu).subscribe(
          (data: any) => {
            if (data) {
              this.isLoadingButton = false;
              this.toastrService.success(
                this.translationService.getValue('MENU_UPDATED_SUCCESSFULLY')
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
          .addFrontMenu(frontMenu)
          .subscribe((response: any) => {
            this.isLoadingButton = false;
            this.toastrService.success(
              this.translationService.getValue('MENU_ADDED_SUCCESSFULLY')
            );
            this.frontMenuForm.reset();
            this.createFrontMenuForm();
          }, (error) => {
            this.isLoadingButton = false;
            this.handleHttpError(error);
          });
      }
    } else {
      this.isLoadingButton = false;
      this.frontMenuForm.markAllAsTouched();
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
