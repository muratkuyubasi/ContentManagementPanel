import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';
import { FoundationPublication } from '@core/domain-classes/web-pages';

@Component({
  selector: 'app-foundation-publication-list',
  templateUrl: './foundation-publication-list.component.html',
  styleUrls: ['./foundation-publication-list.component.css']
})
export class FoundationPublicationListComponent extends BaseComponent implements OnInit {
  list: FoundationPublication[] = [];
  displayedColumns: string[] = ['name', 'writer', 'description', 'action'];
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
    this.sub$.sink = this.webPagesService.getFrontAllPublication().subscribe((data: any) => {
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
            .deleteFrontPublication(front.id)
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
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
}
