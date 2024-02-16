import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundManageDivorceComponent } from './funeral-fund-manage-divorce.component';

describe('FuneralFundManageDivorceComponent', () => {
  let component: FuneralFundManageDivorceComponent;
  let fixture: ComponentFixture<FuneralFundManageDivorceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundManageDivorceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundManageDivorceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
