import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BusquedaService } from './busqueda.service';

describe('BusquedaService', () => {
  let service: BusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusquedaService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(BusquedaService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});