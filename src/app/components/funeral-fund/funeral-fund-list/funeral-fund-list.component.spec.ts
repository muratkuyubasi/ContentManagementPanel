import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralFundListComponent } from './funeral-fund-list.component';

describe('FuneralFundListComponent', () => {
  let component: FuneralFundListComponent;
  let fixture: ComponentFixture<FuneralFundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralFundListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralFundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
