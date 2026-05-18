import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo

import { Guantes } from './guantes';

describe('Guantes', () => {
  let component: Guantes;
  let fixture: ComponentFixture<Guantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guantes],
      providers: [provideZonelessChangeDetection()] // 👈 clave para quitar NG0908
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
