import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  private authService = inject(AuthService);
  public router = inject(Router);
  private favoritosService = inject(FavoritosService);
  
  estaLogueado: boolean = false;
  cantidadFavoritos: number = 0;
  
  // 🔥 Nuevo: Controla si estamos viendo el menú de anfitrión o de viajero
  modoAnfitrion: boolean = false;

  constructor() {
    this.authService.isLoggedIn$.subscribe(status => this.estaLogueado = status);
    this.favoritosService.favoritos$.subscribe(favs => this.cantidadFavoritos = favs.length);
  }

  get esPropietario(): boolean {
    const rol = this.authService.getRolUsuario();
    return rol === 'USUARIO' || rol === 'ROLE_USUARIO';
  }

  // 🔥 Cambia el interruptor visual
  toggleModo() {
    this.modoAnfitrion = !this.modoAnfitrion;
    if (this.modoAnfitrion) {
      this.router.navigate(['/mis-propiedades']);
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  ascenderAPropietario() {
    const token = localStorage.getItem('jwt_token');
    if (!token) return;
    const email = JSON.parse(atob(token.split('.')[1])).sub;
    
    this.authService.ascenderAPropietario(email).subscribe({
      next: () => {
        this.modoAnfitrion = true; // Activa el modo anfitrión al ascender
        this.router.navigate(['/mis-propiedades']);
      }
    });
  }

  
  // ... (mantén el resto de métodos como irAExplorar)

  irAExplorar() {
    if (this.router.url === '/catalogo') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/catalogo']);
      });
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}