import { Routes } from '@angular/router';
import { Equipaciones } from './pages/equipaciones/equipaciones';
import { Botas } from './pages/botas/botas';
import { Guantes } from './pages/guantes/guantes';
import { Chandales } from './pages/chandales/chandales';
import { Home } from './pages/home/home';
import { SeccionUsuario } from './components/seccion-usuario/seccion-usuario';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { AcercaDe } from './pages/acerca-de/acerca-de/acerca-de';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'equipaciones', component: Equipaciones },
  { path: 'botas', component: Botas },
  { path: 'guantes', component: Guantes },
  { path: 'chandales', component: Chandales },
  { path: 'home', component: Home },
  { path: 'seccion-usuario', component: SeccionUsuario },
  { path: 'registro-usuario', component: RegistroUsuario },
  { path: 'acerca-de', component: AcercaDe },
];