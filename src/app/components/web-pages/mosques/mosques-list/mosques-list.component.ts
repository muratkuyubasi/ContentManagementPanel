import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Mosque } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-mosques-list',
  templateUrl: './mosques-list.component.html',
  styleUrls: ['./mosques-list.component.css']
})
export class MosquesListComponent extends BaseComponent implements OnInit {
  list: Mosque[] = [];
  displayedColumns: string[] = ['name', 'address', 'phoneNumber', 'ownerShip', 'imamFullName', 'action'];
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
    this.sub$.sink = this.webPagesService.getFrontAllMosque().subscribe((data: any) => {
      this.list = data
    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }

  delete(front, i) {
    let name = front.name
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${name}`)
      .subscribe((isTrue: boolean) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (isTrue == true) {
          this.sub$.sink = this.webPagesService
            .deleteFrontMosque(front.id)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAll()
            });
        }
        else {
          this.isLoadingButton[i] = !this.isLoadingButton[i]
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

