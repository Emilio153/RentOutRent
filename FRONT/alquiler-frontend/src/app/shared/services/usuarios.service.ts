import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  // Truco: Para extraer el ID del token JWT
  // (El backend debería haber inyectado el "id" en el token, si no, habría que llamar a un endpoint de /me)
  obtenerMiIdDesdeToken(): number | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = atob(payloadBase64);
      const valores = JSON.parse(payloadDecoded);
      // Suponemos que guardaste el id como "id", "userId" o "sub" en el backend
      return valores.id || valores.userId || 1; // Fallback temporal a 1 por si no está en el token
    } catch (e) {
      return null;
    }
  }

  // --- Propietarios ---
  misPropiedades(propietarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/propietarios/${propietarioId}/propiedades`);
  }

  misReservasRecibidas(propietarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/propietarios/${propietarioId}/reservas`);
  }

  // --- Huéspedes ---
  misReservasRealizadas(huespedId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/huespedes/${huespedId}/reservas`);
  }
}
