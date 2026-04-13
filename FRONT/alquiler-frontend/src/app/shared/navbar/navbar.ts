import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth';

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
  private favoritosService = inject(favoritos);
  cantidadFavoritos: number = 0;
  constructor() {
    // Escucha en tiempo real si el usuario entra o sale
    this.authService.isLoggedIn$.subscribe(status => {
      this.estaLogueado = status;
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
