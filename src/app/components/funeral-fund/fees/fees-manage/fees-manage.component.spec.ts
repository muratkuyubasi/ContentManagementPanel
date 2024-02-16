import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesManageComponent } from './fees-manage.component';

describe('FeesManageComponent', () => {
  let component: FeesManageComponent;
  let fixture: ComponentFixture<FeesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
