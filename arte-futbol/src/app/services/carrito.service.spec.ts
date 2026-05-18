import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarritoService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(CarritoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});