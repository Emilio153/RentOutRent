import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mensaje {
  id?: number;
  contenido: string;
  fechaEnvio?: string;
  reserva: { id: number };
  emisor: { id: number, nombre?: string };
  receptor: { id: number, nombre?: string };
}

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrl = 'http://localhost:8092/api';
  private http = inject(HttpClient);

  // Obtener mensajes de una reserva
  obtenerMensajesPorReserva(reservaId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/reservas/${reservaId}/mensajes`);
  }

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.apiUrl}/mensajes`, mensaje);
  }
}
