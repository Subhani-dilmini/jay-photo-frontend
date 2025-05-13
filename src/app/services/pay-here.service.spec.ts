import { TestBed } from '@angular/core/testing';

import { PayHereService } from './pay-here.service';

describe('PayHereService', () => {
  let service: PayHereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayHereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
