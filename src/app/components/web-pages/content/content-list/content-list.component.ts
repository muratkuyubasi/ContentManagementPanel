import { WebPagesService } from './../../web-pages.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { Announcement, FrontMenu } from '@core/domain-classes/web-pages';



@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent extends BaseComponent implements OnInit, OnDestroy {
  announcementList: Announcement[];
  displayedColumns: string[] = ['title', 'shortDescription', 'order', 'isSlider', 'isNews', 'isActive', 'action'];
  isLoadingResults = false;
  isLoadingButton: boolean[] = [];

  constructor(
    private webPageService: WebPagesService,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private commonDialogService: CommonDialogService
  ) {
    super()
  }

  ngOnInit() {
    this.getAllFrontAnnouncements()
  }


  getAllFrontAnnouncements() {
    this.sub$.sink = this.webPageService.getFrontAllAnnouncements().subscribe((data: any) => {
      this.announcementList = data.filter(item => item.isDeleted == false);

    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }


  deleteFrontAnnouncement(announcement, i) {
    let name = announcement.frontAnnouncementRecords[0].title
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${name}`)
      .subscribe((isTrue: boolean) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (isTrue == true) {
          this.sub$.sink = this.webPageService
            .deleteFrontAnnouncement(announcement.code)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAllFrontAnnouncements();
            });
        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }

      });
  }





  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
}
