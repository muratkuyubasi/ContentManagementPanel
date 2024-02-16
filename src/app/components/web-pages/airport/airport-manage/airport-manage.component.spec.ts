import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportManageComponent } from './airport-manage.component';

describe('AirportManageComponent', () => {
  let component: AirportManageComponent;
  let fixture: ComponentFixture<AirportManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
