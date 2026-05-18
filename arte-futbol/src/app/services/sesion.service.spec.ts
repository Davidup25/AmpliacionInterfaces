import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SesionService } from './sesion.service';

describe('SesionService', () => {
  let service: SesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SesionService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(SesionService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});