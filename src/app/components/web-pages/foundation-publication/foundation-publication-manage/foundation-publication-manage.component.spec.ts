import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationPublicationManageComponent } from './foundation-publication-manage.component';

describe('FoundationPublicationManageComponent', () => {
  let component: FoundationPublicationManageComponent;
  let fixture: ComponentFixture<FoundationPublicationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationPublicationManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationPublicationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
