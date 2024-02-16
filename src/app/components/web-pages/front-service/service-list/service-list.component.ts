import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Service } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ApplicationService } from 'src/app/components/application/application.service';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent extends BaseComponent implements OnInit {
  list: Service[] = [];
  displayedColumns: string[] = ['title', 'description', 'isActive', 'action'];
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
    this.sub$.sink = this.webPagesService.getFrontAllService().subscribe((data: any) => {
      this.list = data

    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
  }

  delete(front, i) {
    let title = front.title
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${title}`)
      .subscribe((isTrue: boolean) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (isTrue == true) {
          this.sub$.sink = this.webPagesService
            .deleteFrontService(front.id)
            .subscribe(() => {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
              this.toastrService.success(this.translationService.getValue('SERVICE_DELETED_SUCCESSFULLY'));
              this.getAll()
            });
        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i]
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
