import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { SesionService, UsuarioSesion } from '../../services/sesion.service';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menuAbierto = true;
  categoriasAbiertas = false;
  usuarioAbierto = false;
  carritoAbierto = false;

  carritoItems: ItemCarrito[] = [];
  usuarioActual: UsuarioSesion | null = null;
  terminoBusqueda = '';

  constructor(
    private carritoService: CarritoService,
    private sesionService: SesionService,
    private busquedaService: BusquedaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito.subscribe((items: ItemCarrito[]) => {
      this.carritoItems = items;
    });
    this.sesionService.usuarioActual.subscribe((usuario: UsuarioSesion | null) => {
      this.usuarioActual = usuario;
    });
  }

  get carritoCount(): number { return this.carritoItems.length; }
  get carritoTotal(): number {
    return Math.round(this.carritoItems.reduce((s, i) => s + i.precio, 0) * 100) / 100;
  }

  toggleMenu(): void { this.menuAbierto = !this.menuAbierto; }
  toggleCategorias(): void { this.categoriasAbiertas = !this.categoriasAbiertas; if (this.categoriasAbiertas) { this.usuarioAbierto = false; this.carritoAbierto = false; } }
  toggleUsuario(): void { this.usuarioAbierto = !this.usuarioAbierto; if (this.usuarioAbierto) { this.categoriasAbiertas = false; this.carritoAbierto = false; } }
  toggleCarrito(): void { this.carritoAbierto = !this.carritoAbierto; if (this.carritoAbierto) { this.categoriasAbiertas = false; this.usuarioAbierto = false; } }

  eliminarItem(index: number): void { this.carritoService.eliminar(index); }
  limpiarCarrito(): void { this.carritoService.limpiar(); }

  cerrarSesion(): void {
    this.sesionService.cerrarSesion();
    this.usuarioAbierto = false;
    this.router.navigate(['/home']);
  }

  buscar(): void {
    const term = this.terminoBusqueda.toLowerCase().trim();
    if (term) {
      // 1. Enviamos SIEMPRE la búsqueda al servicio para que filtren los componentes
      this.busquedaService.actualizarBusqueda(this.terminoBusqueda.trim());
      
      const ruta = this.router.url.split('?')[0];
      const rutasCategoria = ['/equipaciones', '/botas', '/chandales', '/guantes'];

      // 2. Si NO estamos en ninguna tienda, le mandamos a la categoría correcta
      if (!rutasCategoria.includes(ruta)) {
        if (term.includes('bota') || term.includes('nike') || term.includes('puma') || (term.includes('adidas') && term.includes('predator'))) {
          this.router.navigate(['/botas']);
        } else if (term.includes('chandal') || term.includes('chándal') || term.includes('sudadera')) {
          this.router.navigate(['/chandales']);
        } else if (term.includes('guante')) {
          this.router.navigate(['/guantes']);
        } else {
          this.router.navigate(['/equipaciones']);
        }
      }
    }
  }

  @HostListener('document:keydown.escape')
  cerrarMenus(): void {
    this.categoriasAbiertas = false;
    this.usuarioAbierto = false;
    this.carritoAbierto = false;
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.dropdownUser') && !target.closest('.cart-item')) {
      this.categoriasAbiertas = false;
      this.usuarioAbierto = false;
      this.carritoAbierto = false;
    }
  }
}