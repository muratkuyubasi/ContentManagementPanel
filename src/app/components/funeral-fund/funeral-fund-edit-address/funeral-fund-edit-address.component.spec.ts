import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundEditAddressComponent } from './funeral-fund-edit-address.component';

describe('FuneralFundEditAddressComponent', () => {
  let component: FuneralFundEditAddressComponent;
  let fixture: ComponentFixture<FuneralFundEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundEditAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
