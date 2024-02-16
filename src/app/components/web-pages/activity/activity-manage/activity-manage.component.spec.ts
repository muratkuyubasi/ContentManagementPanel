import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityManageComponent } from './activity-manage.component';

describe('ActivityManageComponent', () => {
  let component: ActivityManageComponent;
  let fixture: ComponentFixture<ActivityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
