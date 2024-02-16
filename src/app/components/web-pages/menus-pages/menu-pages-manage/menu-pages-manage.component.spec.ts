import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPagesManageComponent } from './menu-pages-manage.component';

describe('MenuPagesManageComponent', () => {
  let component: MenuPagesManageComponent;
  let fixture: ComponentFixture<MenuPagesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPagesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPagesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
