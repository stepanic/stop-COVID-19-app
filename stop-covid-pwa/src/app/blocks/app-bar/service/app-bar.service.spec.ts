import { TestBed } from '@angular/core/testing';

import { AppBarService } from './app-bar.service';

describe('AppBarService', () => {
  let service: AppBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
