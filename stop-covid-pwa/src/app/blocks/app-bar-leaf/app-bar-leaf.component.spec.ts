import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarLeafComponent } from './app-bar-leaf.component';

describe('AppBarLeafComponent', () => {
  let component: AppBarLeafComponent;
  let fixture: ComponentFixture<AppBarLeafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBarLeafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBarLeafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
