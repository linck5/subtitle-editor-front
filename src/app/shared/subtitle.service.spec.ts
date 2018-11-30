import { TestBed, inject } from '@angular/core/testing';

import { SubtitleService } from './subtitle.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('SubtitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, SubtitleService]
    });
  });

  it('should be created', inject([SubtitleService], (service: SubtitleService) => {
    expect(service).toBeTruthy();
  }));
});
