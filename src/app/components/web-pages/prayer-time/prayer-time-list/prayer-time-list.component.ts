import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrayerTimeManageComponent } from '../prayer-time-manage/prayer-time-manage.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { CommonError } from '@core/error-handler/common-error';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { WebPagesService } from '../../web-pages.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-prayer-time-list',
  templateUrl: './prayer-time-list.component.html',
  styleUrls: ['./prayer-time-list.component.css']
})
export class PrayerTimeListComponent extends BaseComponent {
  isLoadingResults = false;
  list: any[];
  displayedColumns: string[] = ['title', 'langcode', 'action'];
  isLoadingButton: boolean[] = [];

  constructor(
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,
    private dialog: MatDialog,
  ) {
    super();

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoadingResults = true;
    this.webPagesService.getFrontAllCountry()
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.list = data;


        },
        (err: CommonError) => {
          err.messages.forEach(msg => {
            this.toastrService.error(msg);
          });
        }
      );
  }

  delete(data: any, i) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${data.name}`)
      .subscribe((resp: any) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (resp==true) {
          this.sub$.sink = this.webPagesService.deleteFrontCountry(data.id).subscribe((data:any) => {
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.isLoadingButton[i] = !this.isLoadingButton[i];
              this.getAll();
          });
        }
        else{
          this.isLoadingButton[i] = !this.isLoadingButton[i];
        }

      });
  }

  manage(list?: any): void {
    const dialogRef = this.dialog.open(PrayerTimeManageComponent, {
      width: '400px',
      height: '300px',
      data: Object.assign({}, list)
    });
    this.sub$.sink = dialogRef.afterClosed()
      .subscribe(result => {
        this.getAll();
      });

  }

}
