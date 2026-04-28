import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo

import { Botas } from './botas';

describe('Botas', () => {
  let component: Botas;
  let fixture: ComponentFixture<Botas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Botas],
      providers: [provideZonelessChangeDetection()] // 👈 clave para quitar NG0908
    })
    .compileComponents();

    fixture = TestBed.createComponent(Botas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
