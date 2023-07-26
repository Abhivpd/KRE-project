import { TestBed } from '@angular/core/testing';

import { ToastrNotifierService } from './toastr-notifier.service';

describe('ToastrNotifierService', () => {
  let service: ToastrNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
