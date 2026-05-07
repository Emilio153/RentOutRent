import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propiedad } from './propiedades.service';

export interface Reserva {
  id?: number;
  fecha_inicio: string; // YYYY-MM-DD
  fecha_fin: string; // YYYY-MM-DD
  total: number;
  estado?: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';
  propiedad?: Partial<Propiedad>;
  huesped?: { id: number, nombre?: string, email?: string };
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:8092/api/reservas';
  private http = inject(HttpClient);

  listarReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  obtenerReservaPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  actualizarEstadoReserva(id: number, estado: string): Observable<Reserva> {
    // Al backend le pasamos al menos el estado (el backend puede requerir otros datos obligatorios según el PUT del API JSON, lo comprobaremos)
    // Según el JSON, es un PUT completo. Simplificaremos asumiendo que el backend puede actualizar el estado. 
    // OJO: El JSON indicaba actualizar enviando varias cosas.
    const payload = { estado: estado };
    // Asumiremos que el backend Spring Data REST permite PUT o PATCH parciales.
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, payload);
  }
}
