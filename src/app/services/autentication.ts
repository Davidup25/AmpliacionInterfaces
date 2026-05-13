import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Usuario, UsuarioRegistro, UsuarioLogin } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private readonly STORAGE_KEY = 'app_usuarios';
  private readonly PBKDF2_ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256;

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  // ---------------------------------------------------------
  // 🔹 UTILIDADES
  // ---------------------------------------------------------

  private obtenerTodosLosUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private guardarUsuarios(usuarios: Usuario[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  verificarUsuarioExiste(email: string): boolean {
    const usuarios = this.obtenerTodosLosUsuarios();
    return usuarios.some(u => u.email === email.toLowerCase());
  }

  private generarSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  private aplicarPBKDF2(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_LENGTH / 32,
      iterations: this.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    }).toString();
  }

  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  // ---------------------------------------------------------
  // 🔹 REGISTRO DE USUARIO
  // ---------------------------------------------------------

  generarUsuario(usuarioRegistro: UsuarioRegistro): Usuario {
    if (this.verificarUsuarioExiste(usuarioRegistro.email)) {
      throw new Error('El usuario con este email ya existe');
    }

    const salt = this.generarSalt();
    const passwordHash = this.aplicarPBKDF2(usuarioRegistro.password, salt);

    const usuario: Usuario = {
      id: this.generarIdUnico(),
      email: usuarioRegistro.email.toLowerCase().trim(),
      nombre: usuarioRegistro.nombre.trim(),
      passwordHash,
      salt,
      fechaRegistro: new Date(),
      activo: true
    };

    const usuarios = this.obtenerTodosLosUsuarios();
    usuarios.push(usuario);
    this.guardarUsuarios(usuarios);

    return usuario;
  }

  // ---------------------------------------------------------
  // 🔹 LOGIN
  // ---------------------------------------------------------

  login(credenciales: UsuarioLogin): boolean {
    const usuarios = this.obtenerTodosLosUsuarios();
    const usuario = usuarios.find(u => u.email === credenciales.email.toLowerCase());

    if (!usuario) return false;

    const hashComprobado = this.aplicarPBKDF2(credenciales.password, usuario.salt);

    return hashComprobado === usuario.passwordHash;
  }

  // ---------------------------------------------------------
  // 🔹 MÉTODO ADICIONAL PARA COMPATIBILIDAD
  // ---------------------------------------------------------

  validarCredenciales(email: string, password: string): boolean {
    return this.login({ email, password });
  }

  // ---------------------------------------------------------
  // 🔹 COMPROBAR FUERZA DE CONTRASEÑA
  // ---------------------------------------------------------

  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];

    if (password.length < 8) errores.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errores.push('Al menos un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>\/?]/.test(password)) errores.push('Al menos un carácter especial');

    return {
      esSegura: errores.length === 0,
      errores
    };
  }
}
