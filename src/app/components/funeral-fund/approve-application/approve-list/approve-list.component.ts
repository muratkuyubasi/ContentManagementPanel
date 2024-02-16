import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FuneralFundService } from '../../funeral-fund.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginatorService } from '@core/services/paginator.service';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.css']
})
export class ApproveListComponent extends BaseComponent implements OnInit {
  skip: number = 0;
  pageSize: number = 10;
  totalCount: number = 0;
  families: any[] = [];
  isLoadingButton: boolean[] = [];
  isApproveButton: boolean[] = [];
  isLoading = false;
  search: string = '';
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
    this.isLoading = true;
    this.sub$.sink = this.funeralFundService.getFamilies(this.skip, this.pageSize, false, false, this.search, this.order).subscribe((data: any) => {
      this.isLoading = false;
      if (data) {
        this.families = data?.data?.data
        this.totalCount = data?.data?.totalCount;
      }
      else {
        this.toastrService.error(data.errors[0])
      }
    },
      (error: any) => {
        this.handleHttpError(error);
        this.isLoading = false;
      }

    )
  }

  handleHttpError(error: any): void {
    if (error && error.error && error.error.errors && error.error.errors.code) {
      const errorMessage = error.error.errors.code[0];
      // console.log(errorMessage)
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
    this.getAll();
  }

  deleteFamily(family: any, i) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${"Üye Numarası: " + family.memberId}`)
      .subscribe((resp: any) => {
        if (resp == true) {
          this.isLoadingButton[i] = !this.isLoadingButton[i]
          this.sub$.sink = this.funeralFundService.deleteFamily(family.id).subscribe((resp: any) => {
            this.isLoadingButton[i] = !this.isLoadingButton[i]
            if (resp.success == true) {
              this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
              this.getAll();

            } else {
              this.isLoadingButton[i] = !this.isLoadingButton[i]
            }
          });

        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i]


        }

      });

  }


  approveFamily(id, i) {
    this.isApproveButton[i] = !this.isApproveButton[i]
    if (id) {
      this.sub$.sink = this.funeralFundService.approveFamily(id).subscribe((data: any) => {
        if (data.success == true) {
          this.toastrService.success('Aile başarıyla onaylandı!', 'Başarılı');
          this.isApproveButton[i] = !this.isApproveButton[i]
          this.getAll();
        }
        else {
          this.isApproveButton[i] = !this.isApproveButton[i]
          this.toastrService.error(data.errors[0])
        }
      }),
        (error: any) => {
          this.isApproveButton[i] = !this.isApproveButton[i]
          this.handleHttpError(error);
        }
    }

  }

  arrangement(column: string) {
    this.sortedColumn = column;
    this.order = this.order === `${column} asc` ? `${column} desc` : `${column} asc`;
    this.getAll();
  }

}
