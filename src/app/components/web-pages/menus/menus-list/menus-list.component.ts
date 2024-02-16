
import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent extends BaseComponent implements OnInit {
  menusList: any[] = [];
  displayedColumns: string[] = ['topMenu', 'menuName', 'order', 'url', 'slug', 'isActive', 'action'];
  isLoadingResults = false;
  loadingId: any;
  isLoadingButton: boolean[] = [];

  constructor(
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllFrontMenus();
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

  deleteFrontMenu(frontMenu, i) {
    let name = frontMenu.frontMenuRecords[0].name
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${name}`)
      .subscribe((isTrue: boolean) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (isTrue == true) {
          this.sub$.sink = this.webPagesService
            .deleteFrontMenu(frontMenu.code)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              if (frontMenu.isDeleted == false) {
                this.getAllFrontMenus()
              }
            });
        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }
      });
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
