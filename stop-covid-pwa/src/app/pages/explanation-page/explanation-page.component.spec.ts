import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationPageComponent } from './explanation-page.component';

describe('ExplanationPageComponent', () => {
  let component: ExplanationPageComponent;
  let fixture: ComponentFixture<ExplanationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
