import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationPublicationListComponent } from './foundation-publication-list.component';

describe('FoundationPublicationListComponent', () => {
  let component: FoundationPublicationListComponent;
  let fixture: ComponentFixture<FoundationPublicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationPublicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationPublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
