import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario = {
    nombre: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'HUESPED' // Por defecto
  };

  cargando = false;
  errorMensaje = '';

  registrar() {
    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.authService.register(this.usuario).subscribe({
      next: (res: any) => {
        // Asumimos que el registro es exitoso y el usuario debe hacer login ahora
        this.cargando = false;
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.cargando = false;
        this.errorMensaje = 'Error al registrar: ' + (err.error?.message || 'Inténtalo de nuevo.');
        console.error('Error de registro', err);
      }
    });
  }
}
