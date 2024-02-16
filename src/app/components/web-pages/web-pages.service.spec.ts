import { TestBed } from '@angular/core/testing';

import { WebPagesService } from './web-pages.service';

describe('WebPagesService', () => {
  let service: WebPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
