import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo
import { SeccionUsuario } from './seccion-usuario';

describe('SeccionUsuario', () => {
  let component: SeccionUsuario;
  let fixture: ComponentFixture<SeccionUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionUsuario],
      providers: [provideZonelessChangeDetection()] // 👈 clave para quitar NG0908
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
