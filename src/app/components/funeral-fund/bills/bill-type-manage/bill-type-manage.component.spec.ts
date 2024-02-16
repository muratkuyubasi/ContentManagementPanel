import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTypeManageComponent } from './bill-type-manage.component';

describe('BillTypeManageComponent', () => {
  let component: BillTypeManageComponent;
  let fixture: ComponentFixture<BillTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
