import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { FrontPage } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { WebPagesService } from '../../web-pages.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-menu-pages',
  templateUrl: './menu-pages.component.html',
  styleUrls: ['./menu-pages.component.css']
})
export class MenuPagesComponent extends BaseComponent implements OnInit {
  pageList: FrontPage[] = [];
  displayedColumns: string[] = ['pageName', 'isActive', 'action'];
  isLoadingResults = false;
  isLoadingButton: boolean[] = [];

  constructor(
    private toastrService: ToastrService,
    private webPagesService: WebPagesService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllFrontPage();
  }


  deleteFrontPage(page, i) {

    let name = page.frontPageRecords[0].name
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${name}`)
      .subscribe((isTrue: boolean) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (isTrue == true) {
          this.sub$.sink = this.webPagesService.deleteFrontPage(page.code)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAllFrontPage()
            });
        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }
      });
  }



  getAllFrontPage() {
    this.sub$.sink = this.webPagesService.getAllFrontPages().subscribe((data: any) => {
      this.pageList = data.filter(page => page.isDeleted === false);
    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }

  showDeleteButton(index: number): boolean {
    return index < 4 || index > 10;
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
