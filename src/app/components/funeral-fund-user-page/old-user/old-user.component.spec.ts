import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldUserComponent } from './old-user.component';

describe('OldUserComponent', () => {
  let component: OldUserComponent;
  let fixture: ComponentFixture<OldUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
