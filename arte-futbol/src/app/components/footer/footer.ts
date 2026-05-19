import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  
  // Función para volver arriba sin cambiar de página
  irArriba() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Esto hace que el scroll sea animado
    });
  }
}