import { TestBed } from '@angular/core/testing';

import { teamsService } from './teamsService';

describe('teamsService', () => {
  let service: teamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(teamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
