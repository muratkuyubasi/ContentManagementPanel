import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquesManageComponent } from './mosques-manage.component';

describe('MosquesManageComponent', () => {
  let component: MosquesManageComponent;
  let fixture: ComponentFixture<MosquesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
