import { TestBed } from '@angular/core/testing';

import { FuneralFundUserPageService } from './funeral-fund-user-page.service';

describe('FuneralFundUserPageService', () => {
  let service: FuneralFundUserPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuneralFundUserPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
