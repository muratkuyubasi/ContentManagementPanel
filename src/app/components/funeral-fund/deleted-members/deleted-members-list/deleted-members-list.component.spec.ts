import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedMembersListComponent } from './deleted-members-list.component';

describe('DeletedMembersListComponent', () => {
  let component: DeletedMembersListComponent;
  let fixture: ComponentFixture<DeletedMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedMembersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
