import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service/carrito.service';

@Component({
  selector: 'app-equipaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipaciones.html',
  styleUrl: './equipaciones.css'
})
export class Equipaciones {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(nombre: string, precio: number): void {
    this.carritoService.agregar({ nombre, precio });
  }
}