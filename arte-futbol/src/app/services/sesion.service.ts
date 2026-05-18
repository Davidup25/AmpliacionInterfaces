import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UsuarioSesion {
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class SesionService {
  private usuario$ = new BehaviorSubject<UsuarioSesion | null>(null);
  usuarioActual = this.usuario$.asObservable();

  iniciarSesion(usuario: UsuarioSesion): void {
    this.usuario$.next(usuario);
  }

  cerrarSesion(): void {
    this.usuario$.next(null);
  }

  obtenerUsuario(): UsuarioSesion | null {
    return this.usuario$.getValue();
  }

  estaLogueado(): boolean {
    return this.usuario$.getValue() !== null;
  }
}