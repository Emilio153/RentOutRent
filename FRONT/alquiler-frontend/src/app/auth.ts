import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // La URL base de tu backend Spring Boot
  private apiUrl = 'http://localhost:8092/api/auth';

  // Inyectamos el HttpClient de Angular (la forma moderna)
  private http = inject(HttpClient);

  constructor() { }

  // ==========================================
  // 1. MÉTODO DE LOGIN
  // ==========================================
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  // ==========================================
  // 2. MÉTODO DE REGISTRO
  // ==========================================
  register(userData: any): Observable<any> {
    // Enviamos el objeto entero (nombre, email, password, etc.) a tu endpoint
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // ==========================================
  // 3. MÉTODOS DE UTILIDAD (Opcionales pero útiles)
  // ==========================================
  
  // Para saber si el usuario está logueado comprobando si tiene token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  // Para cerrar sesión borrando el token
  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}