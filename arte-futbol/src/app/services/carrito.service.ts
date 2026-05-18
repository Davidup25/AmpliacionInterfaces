import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  nombre: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: ItemCarrito[] = [];
  private carrito$ = new BehaviorSubject<ItemCarrito[]>([]);
  carrito = this.carrito$.asObservable();

  agregar(item: ItemCarrito): void {
    this.items = [...this.items, item];
    this.carrito$.next(this.items);
  }

  eliminar(index: number): void {
    this.items = this.items.filter((_, i) => i !== index);
    this.carrito$.next(this.items);
  }

  limpiar(): void {
    this.items = [];
    this.carrito$.next(this.items);
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }
}