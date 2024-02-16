import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajjApplicationListComponent } from './hajj-application-list.component';

describe('HajjApplicationListComponent', () => {
  let component: HajjApplicationListComponent;
  let fixture: ComponentFixture<HajjApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HajjApplicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HajjApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
