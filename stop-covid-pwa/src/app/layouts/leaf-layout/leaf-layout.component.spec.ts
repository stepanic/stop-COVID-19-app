import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafLayoutComponent } from './leaf-layout.component';

describe('LeafLayoutComponent', () => {
  let component: LeafLayoutComponent;
  let fixture: ComponentFixture<LeafLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
