import { TestBed, inject } from '@angular/core/testing';

import { UserFormControlService } from './user-form-control.service';

describe('UserFormControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFormControlService]
    });
  });

  it('should be created', inject([UserFormControlService], (service: UserFormControlService) => {
    expect(service).toBeTruthy();
  }));
});
