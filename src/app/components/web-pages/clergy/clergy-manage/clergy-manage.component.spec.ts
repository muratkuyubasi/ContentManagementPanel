import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClergyManageComponent } from './clergy-manage.component';

describe('ClergyManageComponent', () => {
  let component: ClergyManageComponent;
  let fixture: ComponentFixture<ClergyManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClergyManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClergyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
