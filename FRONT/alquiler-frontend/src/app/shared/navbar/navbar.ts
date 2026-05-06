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
  estaLogueado: boolean = false;
  private favoritosService = inject(FavoritosService);
  cantidadFavoritos: number = 0;

  irAExplorar() {
    // Truco para forzar la recarga del componente si ya estamos en /catalogo
    if (this.router.url === '/catalogo') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/catalogo']);
      });
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  constructor() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
    });
    this.favoritosService.favoritos$.subscribe(favs => {
      this.cantidadFavoritos = favs.length;
    });
  }

  get esPropietario(): boolean {
    const rol = this.authService.getRolUsuario();
    return rol === 'PROPIETARIO' || rol === 'ROLE_PROPIETARIO';
  }

  ascenderAPropietario() {
    // Usamos el token para extraer el email o se lo pedimos
    // Asumiremos que authService tiene el email en el payload
    const token = localStorage.getItem('jwt_token');
    if (!token) return;
    try {
      const payloadDecoded = atob(token.split('.')[1]);
      const valores = JSON.parse(payloadDecoded);
      const email = valores.sub || valores.email; // Depende del JWT de Spring
      if (email) {
        this.authService.ascenderAPropietario(email).subscribe({
          next: () => {
            alert('¡Enhorabuena! Ahora eres Propietario. Puedes publicar alojamientos.');
            this.router.navigate(['/mis-propiedades']);
          },
          error: (err) => console.error(err)
        });
      } else {
        alert('No se pudo encontrar el email en el token para ascender.');
      }
    } catch (e) {
      console.error(e);
    }
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/catalogo']);
  }
}
