import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  carritoAbierto = false;
  carritoItems: { nombre: string; precio: number }[] = [];
  carritoCount = 0;

  constructor(private router: Router, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carritoItems = items;
      this.carritoCount = items.length;
    });
  }

  toggleCarrito(): void {
    this.carritoAbierto = !this.carritoAbierto;
  }

  eliminarDelCarrito(index: number): void {
    this.carritoService.eliminar(index);
  }

  carritoTotal(): number {
    return this.carritoItems.reduce((sum, item) => sum + item.precio, 0);
  }

  buscarDesdeHeader(termino: string): void {
    if (termino && termino.trim()) {
      this.router.navigate(['/equipaciones'], { queryParams: { q: termino.trim() } });
    }
  }
}