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
    this.errorMensaje = '';
    
    this.authService.login(this.emailLogin, this.passwordLogin).subscribe({
      next: (respuesta: any) => {
        this.authService.iniciarSesion(respuesta.token);
        this.cargando = false;
        this.router.navigate(['/catalogo']); 
        // En tu login.ts, después de guardar el token:
       this.favoritosService.cargarFavoritosDelUsuario(this.emailLogin);
      },
      error: (err: any) => {
        this.cargando = false;
        this.errorMensaje = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
      
    });
  }
}