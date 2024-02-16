import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeManageComponent } from './room-type-manage.component';

describe('RoomTypeManageComponent', () => {
  let component: RoomTypeManageComponent;
  let fixture: ComponentFixture<RoomTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
