import { TestBed } from '@angular/core/testing';

import { ProductivitiesService } from './productivities.service';

describe('ProductivitiesService', () => {
  let service: ProductivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
