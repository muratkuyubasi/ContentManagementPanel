import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesManageComponent } from './dues-manage.component';

describe('DuesManageComponent', () => {
  let component: DuesManageComponent;
  let fixture: ComponentFixture<DuesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
