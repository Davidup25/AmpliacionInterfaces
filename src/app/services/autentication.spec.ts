/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo
import { AutenticacionService } from './autentication';
AutenticacionService;
describe('Service: Autenticacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticacionService, provideZonelessChangeDetection()] // 👈 clave para quitar NG0908,
    });
  });
  it('should ...', inject([AutenticacionService], (service: AutenticacionService) => {
    expect(service).toBeTruthy();
  }));
});
