import { TestBed, inject } from '@angular/core/testing';

import { SubtitleService } from './subtitle.service';

describe('SubtitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubtitleService]
    });
  });

  it('should be created', inject([SubtitleService], (service: SubtitleService) => {
    expect(service).toBeTruthy();
  }));
});
