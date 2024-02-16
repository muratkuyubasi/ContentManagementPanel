import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomTypes } from '@core/domain-classes/web-pages';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages.service';

@Component({
  selector: 'app-room-type-manage',
  templateUrl: './room-type-manage.component.html',
  styleUrls: ['./room-type-manage.component.css']
})
export class RoomTypeManageComponent extends BaseComponent implements OnChanges {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<RoomTypeManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomTypes,
    private toastrService: ToastrService,
    private translationService: TranslationService,
    private webPagesService: WebPagesService,
  ) {
    super();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEditMode = true;

      }

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveRoomTypes(): void {
    this.isLoadingButton = true;
    if (this.data.id) {
      this.webPagesService.updateFrontRoomType(this.data).subscribe((data: any) => {
        this.toastrService.success(this.translationService.getValue('ROOM_TYPES_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
        this.isLoadingButton = false;
      });
    } else {
      this.webPagesService.addFrontRoomType(this.data).subscribe((data: any) => {
        this.toastrService.success(this.translationService.getValue('ROOM_TYPES_SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
        this.isLoadingButton = false;
      }
      );
    }
  }

}
