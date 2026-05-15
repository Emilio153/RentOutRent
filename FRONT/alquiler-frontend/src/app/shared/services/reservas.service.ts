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

  actualizarEstadoReserva(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado`, { estado }, { responseType: 'text' });
  }
}
