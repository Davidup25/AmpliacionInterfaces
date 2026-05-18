import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../../services/autentication';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario implements AfterViewInit {
  private isBrowser: boolean;

  nombre = '';
  apellido = '';
  email = '';
  usuario = '';
  clave = '';
  confirmarClave = '';
  terminosAceptados = false;

  mensajeRegistro = '';
  mensajeExito = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private autenticacionService: AutenticacionService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.setupTabs();
    }
  }

  private setupTabs(): void {
    const root = this.el.nativeElement as HTMLElement;
    const tabButtons = root.querySelectorAll('.tab-button');
    const forms = root.querySelectorAll('.login-form');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));
        button.classList.add('active');
        const tabName = button.getAttribute('data-tab');
        const formToShow = root.querySelector('#' + tabName + 'Form');
        if (formToShow) formToShow.classList.add('active');
      });
    });
  }

  registrar(): void {
    if (!this.nombre || !this.email || !this.clave || !this.confirmarClave) {
      this.mensajeRegistro = 'Por favor completa todos los campos obligatorios.';
      this.mensajeExito = false;
      return;
    }

    if (this.clave !== this.confirmarClave) {
      this.mensajeRegistro = 'Las contraseñas no coinciden.';
      this.mensajeExito = false;
      return;
    }

    if (!this.terminosAceptados) {
      this.mensajeRegistro = 'Debes aceptar los términos y condiciones.';
      this.mensajeExito = false;
      return;
    }

    const fortaleza = this.autenticacionService.verificarFortalezaPassword(this.clave);
    if (!fortaleza.esSegura) {
      this.mensajeRegistro = 'Contraseña débil: ' + fortaleza.errores.join(', ');
      this.mensajeExito = false;
      return;
    }

    try {
      this.autenticacionService.generarUsuario({
        nombre: this.nombre + ' ' + this.apellido,
        email: this.email,
        password: this.clave
      });
      this.mensajeRegistro = '¡Cuenta creada correctamente! Ya puedes iniciar sesión.';
      this.mensajeExito = true;
      this.nombre = '';
      this.apellido = '';
      this.email = '';
      this.usuario = '';
      this.clave = '';
      this.confirmarClave = '';
      this.terminosAceptados = false;
    } catch (e: any) {
      this.mensajeRegistro = e.message || 'Error al crear la cuenta.';
      this.mensajeExito = false;
    }
  }
}