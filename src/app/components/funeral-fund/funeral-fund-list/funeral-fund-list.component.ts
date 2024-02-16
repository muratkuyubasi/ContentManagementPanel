import { FuneralFundService } from './../funeral-fund.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { PaginatorService } from '@core/services/paginator.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';



@Component({
  selector: 'app-funeral-fund-list',
  templateUrl: './funeral-fund-list.component.html',
  styleUrls: ['./funeral-fund-list.component.css']
})
export class FuneralFundListComponent extends BaseComponent implements OnInit {
  skip: number = 0;
  pageSize: number = 25;
  totalCount: number = 0;
  families: any[] = [];
  isLoadingResults = false;
  isLoadingButton: boolean[] = []
  search: any = '';
  order: any = '';
  sortedColumn: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private searchSubject = new Subject<string>();

  constructor(
    private toastrService: ToastrService,
    private funeralFundService: FuneralFundService,
    private translationService: TranslationService,
    private commonDialogService: CommonDialogService
    ,private paginatorService: PaginatorService) {
    super();
    this.searchSubject
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      this.skip = 0;
      this.pageSize = 25;
      this.totalCount = 0;
      this.paginator.pageIndex = 0;
      this.getAll();
    });
  }

  ngOnInit(): void {
    this.getAll();  
this.paginatorService.configurePaginator();
  }


  getAll() {
    this.isLoadingResults = true
    this.sub$.sink = this.funeralFundService.getFamilies(this.skip, this.pageSize, true, false, this.search, this.order).subscribe((data: any) => {
      this.isLoadingResults = false;
      if (data) {
        this.families = data?.data?.data
        this.totalCount = data?.data?.totalCount
      }
      else {
        this.toastrService.error(data.errors[0])
      }

    },
      (error: any) => {
        this.isLoadingResults = false;
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

  onSearch(e) {
    this.search = e.target.value ? e.target.value : ''
    this.searchSubject.next(this.search);
  }


  onPageChange(e) {
    this.skip = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAll()
  }

  deleteFamily(family: any, i: any) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${"Üye Numarası: " + family.memberId}`)
      .subscribe((resp: any) => {
        if (resp) {
          this.isLoadingButton[i] = !this.isLoadingButton[i];
          this.sub$.sink = this.funeralFundService.deleteFamily(family.id).subscribe((resp: any) => {
            this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            this.getAll();
            this.isLoadingButton[i] = !this.isLoadingButton[i];
          });

        }

      });

  }

  arrangement(column: string) {
    this.sortedColumn = column;
    this.order = this.order === `${column} asc` ? `${column} desc` : `${column} asc`;
    this.getAll();
  }

}
