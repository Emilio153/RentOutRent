import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // ==========================================
  // 1. LÓGICA DE LA INTERFAZ (Animación)
  // ==========================================
  isRightPanelActive: boolean = false;

  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  // ==========================================
  // 2. DATOS DEL FORMULARIO
  // ==========================================
  // Variables para el Login
  emailLogin = '';
  passwordLogin = '';

  // Objeto para el Registro (coincide con el backend)
  registro = {
    nombre: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'HUESPED' // Valor por defecto
  };

  // ==========================================
  // 3. INYECCIÓN DE SERVICIOS
  // ==========================================
  private authService = inject(AuthService);
  private router = inject(Router);

  // ==========================================
  // 4. FUNCIONES DE CONEXIÓN AL BACKEND
  // ==========================================
  
  onLogin() {
    this.authService.login(this.emailLogin, this.passwordLogin).subscribe({
      next: (respuesta: any) => {
        console.log('¡Login exitoso!', respuesta);
        
        // Guardamos el token
        localStorage.setItem('jwt_token', respuesta.token);
        
        // ¡Magia! Redirigimos al usuario a la vista principal
        // Descomenta esto cuando tengas el componente creado
        // this.router.navigate(['/propiedades']); 
        alert('¡Bienvenido! Has iniciado sesión correctamente.');
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert('Credenciales incorrectas. Revisa tu email y contraseña.');
      }
    });
  }

  onRegister() {
    // IMPORTANTE: Asegúrate de que tu AuthService de Angular tenga un método register()
    this.authService.register(this.registro).subscribe({
      next: (respuesta) => {
        console.log('¡Registro exitoso!', respuesta);
        alert('Cuenta creada con éxito. ¡Inicia sesión para continuar!');
        
        // TRUCO DE UX: Volvemos al panel de Login automáticamente
        this.togglePanel();
        
        // Autocompletamos el email para ahorrarle tiempo al usuario
        this.emailLogin = this.registro.email;
        this.passwordLogin = ''; // Limpiamos la clave por seguridad
      },
      error: (err) => {
        console.error('Error en el registro', err);
        // Mostramos el error exacto que nos envía el Backend (ej: "Las contraseñas no coinciden")
        alert('Error al registrar: ' + (err.error?.error || 'Revisa los datos'));
      }
    });
  }
}