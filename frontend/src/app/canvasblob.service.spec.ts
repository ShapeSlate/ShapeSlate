import { TestBed } from '@angular/core/testing';

import { CanvasblobService } from './canvasblob.service';

describe('CanvasblobService', () => {
  let service: CanvasblobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasblobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
