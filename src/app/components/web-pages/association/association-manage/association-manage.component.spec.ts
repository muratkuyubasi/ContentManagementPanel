import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationManageComponent } from './association-manage.component';

describe('AssociationManageComponent', () => {
  let component: AssociationManageComponent;
  let fixture: ComponentFixture<AssociationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
