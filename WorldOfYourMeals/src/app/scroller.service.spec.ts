import { TestBed } from '@angular/core/testing';

import { ScrollerService } from './scroller.service';

describe('ScrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollerService = TestBed.get(ScrollerService);
    expect(service).toBeTruthy();
  });
});
