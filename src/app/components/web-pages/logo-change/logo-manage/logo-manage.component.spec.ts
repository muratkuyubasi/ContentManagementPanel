import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoManageComponent } from './logo-manage.component';

describe('LogoManageComponent', () => {
  let component: LogoManageComponent;
  let fixture: ComponentFixture<LogoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
