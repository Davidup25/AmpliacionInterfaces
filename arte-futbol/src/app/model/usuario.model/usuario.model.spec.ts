import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SeccionUsuario } from '../../components/seccion-usuario/seccion-usuario';
import { provideRouter } from '@angular/router';

describe('SeccionUsuario', () => {
  let component: SeccionUsuario;
  let fixture: ComponentFixture<SeccionUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionUsuario],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});