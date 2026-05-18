import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { Usuario, UsuarioRegistro, UsuarioLogin } from '../model/usuario.model/usuario.model';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  private readonly STORAGE_KEY = 'app_usuarios';
  private readonly PBKDF2_ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256;
  private isBrowser: boolean;

  constructor(
    private firebaseService: FirebaseService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser && !localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private obtenerUsuariosLocal(): Usuario[] {
    if (!this.isBrowser) return [];
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private guardarUsuariosLocal(usuarios: Usuario[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  private generarSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  private aplicarPBKDF2(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_LENGTH / 32,
      iterations: this.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256,
    }).toString();
  }

  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  verificarUsuarioExiste(email: string): boolean {
    return this.obtenerUsuariosLocal().some(u => u.email === email.toLowerCase());
  }

  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];
    if (password.length < 8) errores.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errores.push('Al menos un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
      errores.push('Al menos un carácter especial');
    return { esSegura: errores.length === 0, errores };
  }

  async generarUsuario(usuarioRegistro: UsuarioRegistro): Promise<Usuario> {
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
      activo: true,
    };
    const usuarios = this.obtenerUsuariosLocal();
    usuarios.push(usuario);
    this.guardarUsuariosLocal(usuarios);
    const guardadoEnFirebase = await this.firebaseService.guardarUsuario(usuario);
    if (!guardadoEnFirebase) {
      console.warn('[AutenticacionService] Firebase no disponible, guardado solo en localStorage.');
    }
    return usuario;
  }

  async login(credenciales: UsuarioLogin): Promise<Usuario | null> {
    let usuarios = this.obtenerUsuariosLocal();
    let usuario = usuarios.find(u => u.email === credenciales.email.toLowerCase());
    if (!usuario) {
      const remoto = await this.firebaseService.buscarUsuarioPorEmail(credenciales.email);
      if (remoto) {
        usuarios.push(remoto);
        this.guardarUsuariosLocal(usuarios);
        usuario = remoto;
      }
    }
    if (!usuario) return null;
    const hashComprobado = this.aplicarPBKDF2(credenciales.password, usuario.salt);
    return hashComprobado === usuario.passwordHash ? usuario : null;
  }

  validarCredenciales(email: string, password: string): boolean {
    if (!this.isBrowser) return false;
    const usuarios = this.obtenerUsuariosLocal();
    const usuario = usuarios.find(u => u.email === email.toLowerCase());
    if (!usuario) return false;
    return this.aplicarPBKDF2(password, usuario.salt) === usuario.passwordHash;
  }
}