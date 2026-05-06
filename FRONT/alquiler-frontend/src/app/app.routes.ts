import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { FavoritosComponent } from './shared/favoritos/favoritos';
import { DetallePropiedadComponent } from './pages/detalle-propiedad/detalle-propiedad';
import { RegistroComponent } from './pages/registro/registro';
import { MisPropiedadesComponent } from './pages/mis-propiedades/mis-propiedades';
import { CrearPropiedadComponent } from './pages/crear-propiedad/crear-propiedad';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas';
import { ChatReservaComponent } from './pages/chat-reserva/chat-reserva';

export const routes: Routes = [
  // Públicas
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'propiedad/:id', component: DetallePropiedadComponent },

  // Privadas (Podrían llevar un Guard, pero lo dejamos simple por ahora)
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'mis-propiedades', component: MisPropiedadesComponent },
  { path: 'crear-propiedad', component: CrearPropiedadComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'chat/:id', component: ChatReservaComponent },

  // Redirecciones
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalogo' }
];