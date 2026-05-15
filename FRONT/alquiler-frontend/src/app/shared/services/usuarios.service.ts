import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth';

export interface UsuarioInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8092/api';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // 🔥 Ahora extrae el ID REAL que tu Spring Boot ha metido en el token
  obtenerMiIdDesdeToken(): number | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = atob(payloadBase64);
      const valores = JSON.parse(payloadDecoded);
      
      // Ya no hay "|| 1". Si no hay ID, es que el token es inválido.
      return valores.id || null; 
    } catch (e) {
      return null;
    }
  }
  
  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  // ==========================================
  // RUTAS DEL USUARIO (Unificadas)
  // ==========================================

// --- Mis Propiedades ---
  misPropiedades(usuarioId: number): Observable<any[]> {
    // 🔥 Truco ninja: El timestamp obliga al navegador a pedir datos frescos
    const timestamp = new Date().getTime();
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${usuarioId}/propiedades?t=${timestamp}`);
  }

  // --- Mis Reservas (Recibidas en mis propiedades) ---
  misReservasRecibidas(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${usuarioId}/reservas/recibidas`);
  }

  // --- Mis Reservas (Realizadas para viajar) ---
  misReservasRealizadas(usuarioId: number): Observable<any[]> {
    // Si en tu backend las tratas juntas, esta URL puede ser igual a la anterior, 
    // pero te las separo por si en tu Spring Boot has creado un endpoint distinto para cada cosa.
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${usuarioId}/reservas`);
  }
}