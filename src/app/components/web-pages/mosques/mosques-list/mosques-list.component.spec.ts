import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquesListComponent } from './mosques-list.component';

describe('MosquesListComponent', () => {
  let component: MosquesListComponent;
  let fixture: ComponentFixture<MosquesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
