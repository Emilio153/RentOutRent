import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth'; 
import { FavoritosService } from '../shared/services/favoritos.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  emailLogin = '';
  passwordLogin = '';
  cargando = false;
  errorMensaje = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private favoritosService = inject(FavoritosService);
  onLogin() {
    this.cargando = true;
    this.authService.login(this.emailLogin, this.passwordLogin).subscribe({
      next: (respuesta) => {
        if (respuesta && respuesta.token) {
          // El authService.iniciarSesion pone el semáforo en verde
          // y el FavoritosService, que está escuchando, cargará los datos solo.
          this.authService.iniciarSesion(respuesta.token); 
          this.router.navigate(['/mis-propiedades']);
        } else {
          this.errorMensaje = 'Error desconocido al iniciar sesión.';
        }
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'Credenciales incorrectas.';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}