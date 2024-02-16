import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';
import { environment } from '@environments/environment';
import { AppSettingService } from '@core/services/app-setting.service';
import { AppSetting } from '@core/domain-classes/app-setting';

@Component({
  selector: 'app-logo-list',
  templateUrl: './logo-list.component.html',
  styleUrls: ['./logo-list.component.css']
})
export class LogoListComponent extends BaseComponent implements OnInit {
  photoUrl:string=environment.apiUrl
  list: any[] = [];
  displayedColumns: string[] = ['title','photo', 'action'];
  isLoadingResults = false;
  isLoadingButton: boolean[] = [];

  constructor(
    private toastrService: ToastrService,
    private appSettingsService: AppSettingService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.sub$.sink = this.appSettingsService.getAppSettings().subscribe((data: AppSetting[]) => {
      this.list = data
    },
      (error: any) => {
        this.handleHttpError(error);
      }

    )
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
