import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedMembersListComponent } from './deceased-members-list.component';

describe('DeceasedMembersListComponent', () => {
  let component: DeceasedMembersListComponent;
  let fixture: ComponentFixture<DeceasedMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeceasedMembersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeceasedMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
