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
  private router = inject(Router);
  estaLogueado: boolean = false;
  private favoritosService = inject(FavoritosService);
  cantidadFavoritos: number = 0;

  constructor() {
    // Escucha en tiempo real si el usuario entra o sale
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
    });
    // 🔥 Escuchamos en vivo cuántos favoritos hay
    this.favoritosService.favoritos$.subscribe(favs => {
      this.cantidadFavoritos = favs.length;
    });
  }

  // Getter para sacar el rol del token
  get esPropietario(): boolean {
    const rol = this.authService.getRolUsuario();
    // Aquí pon la palabra exacta que te salga en jwt.io. Normalmente es 'PROPIETARIO' o 'ROLE_PROPIETARIO'
    return rol === 'PROPIETARIO';
  }
  

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
