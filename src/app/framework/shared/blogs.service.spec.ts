import { TestBed, inject } from '@angular/core/testing';

import { BlogsService } from './blogs.service';
import { HttpClientModule } from '@angular/common/http';

describe('BlogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogsService],
      imports: [HttpClientModule]
    });
  });

  it(
    'should be created',
    inject([BlogsService], (service: BlogsService) => {
      expect(service).toBeTruthy();
    })
  );
  it(
    'should get blogs array',
    inject([BlogsService], (service: BlogsService) => {
      expect(service).toBeTruthy();
    })
  );
});
