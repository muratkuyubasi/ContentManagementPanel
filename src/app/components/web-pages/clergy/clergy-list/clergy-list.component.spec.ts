import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClergyListComponent } from './clergy-list.component';

describe('ClergyListComponent', () => {
  let component: ClergyListComponent;
  let fixture: ComponentFixture<ClergyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClergyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClergyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
