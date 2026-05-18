export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  passwordHash: string;
  salt: string;
  fechaRegistro: Date;
  activo: boolean;
}

export interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
}

export interface UsuarioLogin {
  email: string;
  password: string;
}
