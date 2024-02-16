import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajjApplicationManageComponent } from './hajj-application-manage.component';

describe('HajjApplicationManageComponent', () => {
  let component: HajjApplicationManageComponent;
  let fixture: ComponentFixture<HajjApplicationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HajjApplicationManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HajjApplicationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
