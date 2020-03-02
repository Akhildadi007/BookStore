import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavListComponent } from './side-nav-list.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('SideNavListComponent', () => {
  let fixture: ComponentFixture<SideNavListComponent>;
  let app: SideNavListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavListComponent ],
      imports:[MaterialModule,
      FormsModule,ReactiveFormsModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(SideNavListComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  test('should create', () => {
    expect(app).toBeTruthy();
  });
});
