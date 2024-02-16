import { TestBed } from '@angular/core/testing';

import { FuneralFundService } from './funeral-fund.service';

describe('FuneralFundService', () => {
  let service: FuneralFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuneralFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
