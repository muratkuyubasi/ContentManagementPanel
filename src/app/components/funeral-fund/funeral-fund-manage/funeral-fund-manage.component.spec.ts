import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundManageComponent } from './funeral-fund-manage.component';

describe('FuneralFundManageComponent', () => {
  let component: FuneralFundManageComponent;
  let fixture: ComponentFixture<FuneralFundManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
