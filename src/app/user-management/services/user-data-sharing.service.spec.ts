import { TestBed, inject } from '@angular/core/testing';

import { UserDataSharingService } from './user-data-sharing.service';

describe('UserDataSharingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataSharingService]
    });
  });

  it('should be created', inject([UserDataSharingService], (service: UserDataSharingService) => {
    expect(service).toBeTruthy();
  }));
});
