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
  // ==========================================
  // LECTOR DE TOKEN (Decodificador JWT)
  // ==========================================
  
  // Devuelve 'PROPIETARIO', 'HUESPED' o null si no hay token
  getRolUsuario(): string | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;

    try {
      // El token JWT tiene 3 partes separadas por puntos. 
      // La parte 2 (índice 1) es el "Payload" (los datos).
      const payloadBase64 = token.split('.')[1];
      // Decodificamos de Base64 a Texto
      const payloadDecoded = atob(payloadBase64);
      // Lo convertimos a un objeto JSON de JavaScript
      const valores = JSON.parse(payloadDecoded);
      
      // OJO: Aquí dependemos de cómo guardó Spring Boot el rol en el token.
      // Normalmente se guarda en "role", "roles", o "authorities".
      // Imprimimos por consola para "espiar" qué nos manda el backend:
      console.log('Datos ocultos en el Token:', valores);
      
      return valores.rol || valores.role || valores.authorities || null; 
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return null;
    }
  }
}