import { TestBed } from '@angular/core/testing';

import { SlateRoomService } from './slateroom.service';

describe('SessionService', () => {
  let service: SlateRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlateRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
