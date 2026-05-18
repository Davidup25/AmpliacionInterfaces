import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo

import { Equipaciones } from './equipaciones';

describe('Equipaciones', () => {
  let component: Equipaciones;
  let fixture: ComponentFixture<Equipaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipaciones],
      providers: [provideZonelessChangeDetection()] // 👈 clave para quitar NG0908
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equipaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
