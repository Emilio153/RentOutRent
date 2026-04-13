import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { FavoritosComponent } from './shared/services/favoritos/favoritos';

// ==========================================
// 2. CONFIGURACIÓN DEL MAPA DE RUTAS
// ==========================================
export const routes: Routes = [

  // Pantalla de Autenticación
  {
    path: 'login',
    component: LoginComponent
  },

  // Pantalla Principal del Catálogo
  {
    path: 'catalogo',
    component: CatalogoComponent
  },

  // Pantalla de la lista de Favoritos guardados
  {
    path: 'favoritos',
    component: FavoritosComponent
  },

  // (FUTURO) Pantalla de detalle de una casa al pulsar "Ver más"
  // { 
  //   path: 'propiedad/:id', 
  //   component: DetallePropiedadComponent 
  // },

  // ==========================================
  // REDIRECCIONES DE SEGURIDAD
  // ==========================================

  // Si alguien entra a la raíz vacía (http://localhost:4200/), lo mandamos al login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Si alguien escribe una ruta inventada (http://localhost:4200/patata), lo mandamos al login
  {
    path: '**',
    redirectTo: '/login'
  }
];