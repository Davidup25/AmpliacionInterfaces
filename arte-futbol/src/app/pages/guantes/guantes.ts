import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusquedaService, Producto } from '../../services/busqueda.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-guantes',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './guantes.html',
  styleUrl: './guantes.css'
})
export class Guantes implements OnInit {
  productos: Producto[] = [];
  private todosLosProductos: Producto[] = [];

  constructor(
    private busquedaService: BusquedaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.todosLosProductos = this.busquedaService.obtenerPorCategoria('guantes');
    this.productos = [...this.todosLosProductos];

    this.busquedaService.terminoBusqueda.subscribe((t: string) => {
      const term = t.toLowerCase().trim();
      this.productos = this.todosLosProductos.filter(p =>
        !term || p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term)
      );
    });
  }

  agregarAlCarrito(nombre: string, precio: number): void {
    this.carritoService.agregar({ nombre, precio });
  }
}