import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autentication';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seccion-usuario.html',
  styleUrls: ['./seccion-usuario.css'],
})
export class SeccionUsuario {
  email = '';
  password = '';
  mensajeValidacion = '';
  mensajeExito = false;
  cargando = false;

  constructor(
    private autService: AutenticacionService,
    private sesionService: SesionService,
    private router: Router
  ) {}

  async validarLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.mensajeValidacion = 'Por favor, completa todos los campos.';
      this.mensajeExito = false;
      return;
    }
    this.cargando = true;
    this.mensajeValidacion = '';
    try {
      const usuario = await this.autService.login({ email: this.email, password: this.password });
      if (usuario) {
        this.sesionService.iniciarSesion({ nombre: usuario.nombre, email: usuario.email });
        this.mensajeValidacion = `¡Bienvenido, ${usuario.nombre}!`;
        this.mensajeExito = true;
        this.email = '';
        this.password = '';
        setTimeout(() => this.router.navigate(['/home']), 1500);
      } else {
        this.mensajeValidacion = 'Usuario o contraseña incorrectos.';
        this.mensajeExito = false;
      }
    } catch {
      this.mensajeValidacion = 'Error al conectar. Inténtalo de nuevo.';
      this.mensajeExito = false;
    } finally {
      this.cargando = false;
    }
  }
}