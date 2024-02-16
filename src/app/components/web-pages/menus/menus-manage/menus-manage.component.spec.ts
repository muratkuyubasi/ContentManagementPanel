import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusManageComponent } from './menus-manage.component';

describe('MenusManageComponent', () => {
  let component: MenusManageComponent;
  let fixture: ComponentFixture<MenusManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
