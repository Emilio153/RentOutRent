import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth';
import { FavoritosService } from '../services/favoritos.service';
import { UsuariosService } from '../services/usuarios.service';
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
  private cdr = inject(ChangeDetectorRef);
  private usuariosService = inject(UsuariosService);
  estaLogueado: boolean = false;
  nombreUsuario: string = '';
  
  cantidadFavoritos: number = 0;
  
  modoAnfitrion: boolean = false;

  constructor() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
      if (status) {
        this.cargarDatosUsuario();
      } else {
        this.nombreUsuario = '';
      }
      this.cdr.markForCheck();
    });
    
    // 🔥 3. Cuando lleguen los favoritos del servidor, despertamos a la burbuja
    this.favoritosService.favoritos$.subscribe(favs => {
      this.cantidadFavoritos = favs.length;
      this.cdr.markForCheck(); 
    });
  }
  // 🔥 Función para obtener el nombre del usuario desde la BD
  cargarDatosUsuario() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (miId) {
      // Usamos el endpoint que ya deberías tener en tu backend para ver un usuario
      this.usuariosService.getUsuarioById(miId).subscribe({
        next: (u: any) => {
          this.nombreUsuario = u.nombre;
          this.cdr.markForCheck();
        },
        error: (err: any) => console.error('Error al cargar nombre:', err)
      });
    }
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