import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundDetailComponent } from './funeral-fund-detail.component';

describe('FuneralFundDetailComponent', () => {
  let component: FuneralFundDetailComponent;
  let fixture: ComponentFixture<FuneralFundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
