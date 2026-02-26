import { TestBed } from '@angular/core/testing';

import { MockServices } from './mock.services';

describe('MockServices', () => {
  let service: MockServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
