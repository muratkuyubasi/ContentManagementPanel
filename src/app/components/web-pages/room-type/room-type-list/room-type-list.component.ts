import { RoomTypeManageComponent } from './../room-type-manage/room-type-manage.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { RoomTypes } from '@core/domain-classes/web-pages';
import { CommonError } from '@core/error-handler/common-error';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-room-type-list',
  templateUrl: './room-type-list.component.html',
  styleUrls: ['./room-type-list.component.css']
})
export class RoomTypeListComponent extends BaseComponent {
  isLoadingResults = false;
  roomTypes: RoomTypes[];
  displayedColumns: string[] = ['title', 'action'];
  isLoadingButton: boolean[]=[];

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
    this.getRoomTypes();
  }

  getRoomTypes(): void {
    this.isLoadingResults = true;
    this.webPagesService.getFrontAllRoomType()
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.roomTypes = data;
        },
        (err: CommonError) => {
          err.messages.forEach(msg => {
            this.toastrService.error(msg);
          });
        }
      );
  }

  deleteRoomTypes(roomTypes: RoomTypes,i) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${roomTypes.roomTypes}`)
      .subscribe((resp: any) => {
        this.isLoadingButton[i] = !this.isLoadingButton[i]
        if (resp == true) {
          this.sub$.sink = this.webPagesService.deleteFrontRoomTypes(roomTypes.id).subscribe(() => {
            this.toastrService.success(this.translationService.getValue('ROOM_TYPES_DELETED_SUCCESSFULLY'));
            this.isLoadingButton[i] = !this.isLoadingButton[i];
            this.getRoomTypes();
          });
        } else {
          this.isLoadingButton[i] = !this.isLoadingButton[i]

        }

      });
  }

  manageRoomTypes(roomTypes?: RoomTypes): void {
    const dialogRef = this.dialog.open(RoomTypeManageComponent, {
      width: '300px',
      height: '200px',
      data: Object.assign({}, roomTypes)
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRoomTypes();

    })


  }

}
