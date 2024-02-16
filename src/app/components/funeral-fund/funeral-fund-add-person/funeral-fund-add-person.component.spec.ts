import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundAddPersonComponent } from './funeral-fund-add-person.component';

describe('FuneralFundAddPersonComponent', () => {
  let component: FuneralFundAddPersonComponent;
  let fixture: ComponentFixture<FuneralFundAddPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundAddPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundAddPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
