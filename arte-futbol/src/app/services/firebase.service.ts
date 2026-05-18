import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model/usuario.model';

const FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  projectId: "TU_PROJECT_ID",
};

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents`;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private toFirestoreFields(obj: Record<string, any>): Record<string, any> {
    const fields: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        fields[key] = { stringValue: value };
      } else if (typeof value === 'boolean') {
        fields[key] = { booleanValue: value };
      } else if (typeof value === 'number') {
        fields[key] = { integerValue: String(value) };
      } else if (value instanceof Date) {
        fields[key] = { timestampValue: value.toISOString() };
      } else {
        fields[key] = { stringValue: String(value) };
      }
    }
    return fields;
  }

  private fromFirestoreDoc(doc: any): Usuario | null {
    if (!doc?.fields) return null;
    const f = doc.fields;
    return {
      id: f['id']?.stringValue ?? '',
      email: f['email']?.stringValue ?? '',
      nombre: f['nombre']?.stringValue ?? '',
      passwordHash: f['passwordHash']?.stringValue ?? '',
      salt: f['salt']?.stringValue ?? '',
      fechaRegistro: new Date(f['fechaRegistro']?.timestampValue ?? Date.now()),
      activo: f['activo']?.booleanValue ?? true,
    };
  }

  async obtenerTodosLosUsuarios(): Promise<Usuario[]> {
    try {
      const res = await fetch(`${FIRESTORE_BASE_URL}/usuarios?key=${FIREBASE_CONFIG.apiKey}`);
      if (!res.ok) throw new Error(`Firestore GET error: ${res.status}`);
      const data = await res.json();
      if (!data.documents) return [];
      return data.documents
        .map((doc: any) => this.fromFirestoreDoc(doc))
        .filter((u: Usuario | null): u is Usuario => u !== null);
    } catch (err) {
      console.error('[FirebaseService] obtenerTodosLosUsuarios:', err);
      return [];
    }
  }

  async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const usuarios = await this.obtenerTodosLosUsuarios();
    return usuarios.find(u => u.email === email.toLowerCase().trim()) ?? null;
  }

  async guardarUsuario(usuario: Usuario): Promise<boolean> {
    try {
      const fields = this.toFirestoreFields({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        passwordHash: usuario.passwordHash,
        salt: usuario.salt,
        fechaRegistro: usuario.fechaRegistro,
        activo: usuario.activo,
      });
      const res = await fetch(
        `${FIRESTORE_BASE_URL}/usuarios/${usuario.id}?key=${FIREBASE_CONFIG.apiKey}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields }),
        }
      );
      return res.ok;
    } catch (err) {
      console.error('[FirebaseService] guardarUsuario:', err);
      return false;
    }
  }

  async actualizarEstadoUsuario(id: string, activo: boolean): Promise<boolean> {
    try {
      const res = await fetch(
        `${FIRESTORE_BASE_URL}/usuarios/${id}?updateMask.fieldPaths=activo&key=${FIREBASE_CONFIG.apiKey}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: { activo: { booleanValue: activo } } }),
        }
      );
      return res.ok;
    } catch (err) {
      console.error('[FirebaseService] actualizarEstadoUsuario:', err);
      return false;
    }
  }

  async eliminarUsuario(id: string): Promise<boolean> {
    try {
      const res = await fetch(
        `${FIRESTORE_BASE_URL}/usuarios/${id}?key=${FIREBASE_CONFIG.apiKey}`,
        { method: 'DELETE' }
      );
      return res.ok;
    } catch (err) {
      console.error('[FirebaseService] eliminarUsuario:', err);
      return false;
    }
  }
}