import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginatorService } from '@core/services/paginator.service';

@Component({
  selector: 'app-deleted-members-list',
  templateUrl: './deleted-members-list.component.html',
  styleUrls: ['./deleted-members-list.component.css']
})
export class DeletedMembersListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  skip: number = 0;
  pageSize: number = 10;
  totalCount: number = 0;

  deletedMembers: any[] = [];
  isLoadingResults = false;
  isLoadingButton: boolean = false

  private searchSubject = new Subject<string>();
  search: string = "";

  constructor(
    private toastrService: ToastrService,
    private funeralFundService: FuneralFundService
    ,private paginatorService: PaginatorService) {
    super();
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.skip = 0;
        this.pageSize = 10;
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
    this.sub$.sink = this.funeralFundService.getDeletedMembers(this.skip, this.pageSize, this.search).subscribe((data: any) => {
      this.isLoadingResults = false;
      if (data) {
        this.deletedMembers = data.data;
        this.totalCount = data.totalCount;
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

  onSearch(e) {
    this.search = e.target.value ? e.target.value : ''
    this.searchSubject.next(this.search);

  }

  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  onPageChange(e) {
    this.skip = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAll()

  }

}
