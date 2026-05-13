import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../services/autentication';

@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-usuario.html',
  styleUrls: ['./seccion-usuario.css'],
})
export class SeccionUsuario implements AfterViewInit {
  constructor(private autenticacionService: AutenticacionService) {}

  ngAfterViewInit(): void {
    this.setupTabs();
    this.setupLogin();
  }

  // Configuración de pestañas
  private setupTabs(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.login-form');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));

        button.classList.add('active');
        const tabName = button.getAttribute('data-tab');
        const formToShow = document.getElementById(tabName + 'Form');
        if (formToShow) formToShow.classList.add('active');

        this.limpiarMensaje();
      });
    });
  }

  // Configuración del botón de login
  private setupLogin(): void {
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
      btnLogin.addEventListener('click', () => this.validarLogin());
    }
  }

  private validarLogin(): void {
    const usuarioInput = document.getElementById('loginUsuario') as HTMLInputElement;
    const contraseñaInput = document.getElementById('loginClave') as HTMLInputElement;

    if (!usuarioInput || !contraseñaInput) return;

    const email = usuarioInput.value.trim();
    const password = contraseñaInput.value.trim();

    if (!email || !password) {
      this.mostrarMensaje('Vamos, completa todos los campos', false);
      return;
    }

    const esValido = this.autenticacionService.validarCredenciales(email, password);

    if (esValido) {
      this.mostrarMensaje('Validación correcta', true);
      usuarioInput.value = '';
      contraseñaInput.value = '';
    } else {
      this.mostrarMensaje('Validación incorrecta - Usuario o contraseña inválidos', false);
    }
  }

  private mostrarMensaje(texto: string, esExitoso: boolean): void {
    const mensajeDiv = document.getElementById('mensajeValidacion');
    if (!mensajeDiv) return;

    mensajeDiv.textContent = texto;
    mensajeDiv.style.display = 'block';
    mensajeDiv.className = esExitoso ? 'mensaje-validacion mensaje-exito' : 'mensaje-validacion mensaje-error';

    setTimeout(() => this.limpiarMensaje(), 5000);
  }

  private limpiarMensaje(): void {
    const mensajeDiv = document.getElementById('mensajeValidacion');
    if (!mensajeDiv) return;

    mensajeDiv.style.display = 'none';
    mensajeDiv.textContent = '';
  }
}
