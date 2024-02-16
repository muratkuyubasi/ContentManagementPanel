import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundEditComponent } from './funeral-fund-edit.component';

describe('FuneralFundEditComponent', () => {
  let component: FuneralFundEditComponent;
  let fixture: ComponentFixture<FuneralFundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
