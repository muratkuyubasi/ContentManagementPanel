import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Activity, Clergy } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-clergy-list',
  templateUrl: './clergy-list.component.html',
  styleUrls: ['./clergy-list.component.css']
})
export class ClergyListComponent extends BaseComponent implements OnInit {
  list: Clergy[] = [];
  displayedColumns: string[] = ['name', 'surname', 'jobDescription', 'placeOfDuty', 'action'];
  isLoadingResults = false;
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
    this.getAll();
  }

  getAll() {
    this.sub$.sink = this.webPagesService.getFrontAllClergy().subscribe((data: any) => {
      this.list = data

    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }

  delete(front, i) {
    let name = front.name
    let surname = front.surname
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${name} ${surname}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue == true) {
          this.isLoadingButton[i] = !this.isLoadingButton[i]
          this.sub$.sink = this.webPagesService
            .deleteFrontClergy(front.id)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAll()

            });
        }
        else {
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
