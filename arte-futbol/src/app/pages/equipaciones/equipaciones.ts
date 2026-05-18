import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaService, Producto } from '../../services/busqueda.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-equipaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './equipaciones.html',
  styleUrl: './equipaciones.css',
})
export class Equipaciones implements OnInit {
  terminoBusqueda = '';
  orden = 'default';
  productosFiltrados: Producto[] = [];
  private todosLosProductos: Producto[] = [];
  busquedaGlobal = false;

  constructor(
    private busquedaService: BusquedaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.todosLosProductos = this.busquedaService.obtenerPorCategoria('equipaciones');
    this.productosFiltrados = [...this.todosLosProductos];

    this.terminoBusqueda = this.busquedaService.obtenerTerminoActual();

    this.busquedaService.terminoBusqueda.subscribe((t: string) => {
      this.terminoBusqueda = t;
      this.filtrar();
    });
  }

  filtrar(): void {
    const term = this.terminoBusqueda.toLowerCase().trim();

    // Si hay término, buscar en todo el catálogo
    if (term) {
      this.productosFiltrados = this.busquedaService.buscarEnTodo(term);
      this.busquedaGlobal = true;
    } else {
      this.productosFiltrados = [...this.todosLosProductos];
      this.busquedaGlobal = false;
    }

    if (this.orden === 'precio-asc') this.productosFiltrados.sort((a, b) => a.precio - b.precio);
    else if (this.orden === 'precio-desc') this.productosFiltrados.sort((a, b) => b.precio - a.precio);
    else if (this.orden === 'nombre') this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  agregarAlCarrito(nombre: string, precio: number): void {
    this.carritoService.agregar({ nombre, precio });
  }
}