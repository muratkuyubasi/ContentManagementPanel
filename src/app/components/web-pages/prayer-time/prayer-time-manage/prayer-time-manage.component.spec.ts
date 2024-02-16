import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerTimeManageComponent } from './prayer-time-manage.component';

describe('PrayerTimeManageComponent', () => {
  let component: PrayerTimeManageComponent;
  let fixture: ComponentFixture<PrayerTimeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrayerTimeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerTimeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
