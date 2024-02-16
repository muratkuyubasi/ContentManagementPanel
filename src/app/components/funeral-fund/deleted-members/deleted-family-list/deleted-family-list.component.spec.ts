import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedFamilyListComponent } from './deleted-family-list.component';

describe('DeletedFamilyListComponent', () => {
  let component: DeletedFamilyListComponent;
  let fixture: ComponentFixture<DeletedFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedFamilyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
