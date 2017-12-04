import { TestBed, inject } from '@angular/core/testing';

import { ManageRatingsService } from './manage-ratings.service';

describe('ManageRatingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageRatingsService]
    });
  });

  it('should be created', inject([ManageRatingsService], (service: ManageRatingsService) => {
    expect(service).toBeTruthy();
  }));
});
