import { TestBed } from '@angular/core/testing';

import { SharedMenuService } from './shared-menu.service';

describe('SharedMenuService', () => {
  let service: SharedMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
