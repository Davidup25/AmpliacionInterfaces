import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  nombre: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  agregar(item: ItemCarrito): void {
    this.items = [...this.items, item];
    this.carritoSubject.next(this.items);
  }

  eliminar(index: number): void {
    this.items = this.items.filter((_, i) => i !== index);
    this.carritoSubject.next(this.items);
  }

  limpiar(): void {
    this.items = [];
    this.carritoSubject.next(this.items);
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }
}