import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'd:/RentOutRent/FRONT/alquiler-frontend/src/app/auth'; // Ajusta tu ruta

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

  // Getter para saber si hay alguien logueado
  get estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  // Getter para sacar el rol del token
  get esPropietario(): boolean {
    const rol = this.authService.getRolUsuario();
    // Aquí pon la palabra exacta que te salga en jwt.io. Normalmente es 'PROPIETARIO' o 'ROLE_PROPIETARIO'
    return rol === 'PROPIETARIO' || rol === 'ROLE_PROPIETARIO';
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
