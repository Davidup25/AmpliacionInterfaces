import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
}

const CATALOGO: Producto[] = [
  { id:1, nombre:'Equipación Local Barcelona', descripcion:'Conjunto oficial de la temporada.', categoria:'equipaciones', precio:89.99, imagen:'https://www.futbolemotion.com/imagesarticulos/269504/grandes/camiseta-nike-fc-barcelona-primera-equipacion-2025-2026-deep-royal-blue-0.webp' },
  { id:2, nombre:'Equipación Visitante Barcelona', descripcion:'Segunda equipación con tejido ligero.', categoria:'equipaciones', precio:84.99, imagen:'https://www.futbolemotion.com/imagesarticulos/309337/750/camiseta-nike-fc-barcelona-segunda-equipacion-2025-2026-gold-0.webp' },
  { id:3, nombre:'Equipación Tercera Barcelona', descripcion:'Edición especial colores alternativos.', categoria:'equipaciones', precio:84.99, imagen:'https://www.futbolemotion.com/imagesarticulos/269503/750/camiseta-nike-fc-barcelona-tercera-equipacion-2025-2026-bright-mango-0.webp' },
  { id:4, nombre:'Equipación Retro Atlético', descripcion:'Modelos clásicos coleccionables.', categoria:'equipaciones', precio:69.99, imagen:'https://shop.atleticodemadrid.com/on/demandware.static/-/Sites-atm-master-catalog/default/dwf945994c/22CM1121_1.jpeg' },
  { id:5, nombre:'Equipación Brasil Especial', descripcion:'Camiseta oficial de selección.', categoria:'equipaciones', precio:94.99, imagen:'https://www.futbolemotion.com/imagesarticulos/260544/750/camiseta-nike-brasil-edicion-especial-reissue-opti-yellow-apple-green-apple-green-4.webp' },
  { id:6, nombre:'Equipación Entrenamiento Real Madrid', descripcion:'Ropa técnica para rendimiento.', categoria:'equipaciones', precio:59.99, imagen:'https://www.futbolemotion.com/imagesarticulos/264889/750/camiseta-adidas-real-madrid-training-2025-2026-almost-lime-0.webp' },
  { id:7, nombre:'Botas SG Nike Phantom', descripcion:'Botas ligeras para campo natural. Máximo agarre y control.', categoria:'botas', precio:129.99, imagen:'https://www.futbolemotion.com/imagesarticulos/268939/750/bota-nike-phantom-6-low-elite-sg-pro-royal-tint-brt-crimson-0.webp' },
  { id:8, nombre:'Botas AG Puma Future', descripcion:'Perfectas para césped artificial. Gran amortiguación.', categoria:'botas', precio:109.99, imagen:'https://www.futbolemotion.com/imagesarticulos/254582/750/bota-puma-future-8-ultimate-ag-yellow-alert-puma-black-sun-struck-0.webp' },
  { id:9, nombre:'Botas Híbridas Adidas Predator', descripcion:'Diseño profesional para una precisión superior.', categoria:'botas', precio:149.99, imagen:'https://www.futbolemotion.com/imagesarticulos/287512/750/bota-adidas-predator-mania-gunmet-hiemte-gridos-rubi-pure-0.webp' },
  { id:10, nombre:'Chándal Kit Entrenamiento Barcelona', descripcion:'Confeccionado en tejido transpirable para entrenamientos intensos.', categoria:'chandales', precio:79.99, imagen:'https://www.futbolemotion.com/imagesarticulos/269520/750/chandal-nike-fc-barcelona-training-2025-2026-crimson-tint-midnight-navy-bright-mango-midni-0.webp' },
  { id:11, nombre:'Chándal Kit Paseo Real Madrid', descripcion:'Diseño ligero ideal para uso diario o pre-partido.', categoria:'chandales', precio:74.99, imagen:'https://www.futbolemotion.com/imagesarticulos/264893/750/chandal-adidas-real-madrid-training-2025-2026-almost-lime-utility-grey-0.webp' },
  { id:12, nombre:'Sudadera Real Zaragoza', descripcion:'Parte de arriba de chándal oficial.', categoria:'chandales', precio:49.99, imagen:'https://www.futbolemotion.com/imagesarticulos/267787/750/sudadera-adidas-real-zaragoza-entreno-jugador-25-26-azul-marino-0.webp' },
  { id:13, nombre:'Guantes Portero Hombre Nike', descripcion:'Guantes con palma de látex alemán para alta adherencia.', categoria:'guantes', precio:39.99, imagen:'https://www.futbolemotion.com/imagesarticulos/237942/750/guantes-nike-grip3-amarillo-0.webp' },
  { id:14, nombre:'Guantes Portero Mujer SP Fútbol', descripcion:'Guantes ergonómicos diseñados para mujer.', categoria:'guantes', precio:34.99, imagen:'https://www.futbolemotion.com/imagesarticulos/254702/750/guantes-sp-futbol-earhart-pro-air-chr-morado-fucsia-0.webp' },
  { id:15, nombre:'Guantes Portero Junior Reusch', descripcion:'Ajuste ergonómico para los futuros porteros.', categoria:'guantes', precio:29.99, imagen:'https://www.futbolemotion.com/imagesarticulos/304342/750/guantes-reusch-junior-attrakt-25-infinity-finger-support-yellow-amarillo-0.webp' },
];

@Injectable({ providedIn: 'root' })
export class BusquedaService {
  private terminoBusqueda$ = new BehaviorSubject<string>('');
  terminoBusqueda = this.terminoBusqueda$.asObservable();

  actualizarBusqueda(termino: string): void {
    this.terminoBusqueda$.next(termino.toLowerCase().trim());
  }

  buscarProductos(termino: string, categoria?: string): Producto[] {
    return CATALOGO.filter(p => {
      const coincideTexto = !termino ||
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino);
      const coincideCategoria = !categoria || p.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
  }

  obtenerPorCategoria(categoria: string): Producto[] {
    return CATALOGO.filter(p => p.categoria === categoria);
  }

  obtenerTerminoActual(): string {
  return this.terminoBusqueda$.getValue();
  }
  buscarEnTodo(termino: string): Producto[] {
    return CATALOGO.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase().trim()) ||
      p.descripcion.toLowerCase().includes(termino.toLowerCase().trim())
    );
  }
}