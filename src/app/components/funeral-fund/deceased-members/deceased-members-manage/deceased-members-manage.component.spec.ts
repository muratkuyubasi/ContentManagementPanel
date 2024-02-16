import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedMembersManageComponent } from './deceased-members-manage.component';

describe('DeceasedMembersManageComponent', () => {
  let component: DeceasedMembersManageComponent;
  let fixture: ComponentFixture<DeceasedMembersManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeceasedMembersManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeceasedMembersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
