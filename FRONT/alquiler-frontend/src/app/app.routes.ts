import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; // Ajusta tus rutas
import { Catalogo } from './pages/catalogo/catalogo'; // Ajusta tus rutas

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: Catalogo },
  // Si alguien entra a la raíz de la web, lo mandamos al login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Si alguien pone una ruta que no existe, lo mandamos al login
  { path: '**', redirectTo: '/login' } 
];