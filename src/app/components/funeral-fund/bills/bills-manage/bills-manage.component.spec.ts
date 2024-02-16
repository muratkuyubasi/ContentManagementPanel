import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsManageComponent } from './bills-manage.component';

describe('BillsManageComponent', () => {
  let component: BillsManageComponent;
  let fixture: ComponentFixture<BillsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
