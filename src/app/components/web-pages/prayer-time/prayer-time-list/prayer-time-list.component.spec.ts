import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerTimeListComponent } from './prayer-time-list.component';

describe('PrayerTimeListComponent', () => {
  let component: PrayerTimeListComponent;
  let fixture: ComponentFixture<PrayerTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrayerTimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
