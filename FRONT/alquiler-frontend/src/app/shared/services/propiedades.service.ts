import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Propiedad {
  id?: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio_noche: number;
  max_huespedes: number;
  calendario?: string; // Fecha en formato YYYY-MM-DD
  propietario?: { id: number }; // Solo el ID es necesario para el backend
  imagenes?: { id: number, url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  private apiUrl = 'http://localhost:8092/api';
  private http = inject(HttpClient);

  // 4. Propiedades
  listarPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propiedades`);
  }
  // Obtener una propiedad por ID para editar
  getPropiedadById(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/propiedades/${id}`);
  }

  buscarPropiedades(termino: string): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propiedades/buscar?termino=${termino}`);
  }

  crearPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    return this.http.post<Propiedad>(`${this.apiUrl}/propiedades`, propiedad);
  }

  actualizarPropiedad(id: number, propiedad: Propiedad): Observable<Propiedad> {
  return this.http.put<Propiedad>(`${this.apiUrl}/propiedades/${id}`, propiedad);
  }

  borrarPropiedad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/propiedades/${id}`);
  }
  // 7. Imágenes
  anadirImagen(propiedadId: number, url: string): Observable<any> {
    const payload = {
      url: url,
      propiedad: { id: propiedadId }
    };
    return this.http.post(`${this.apiUrl}/imagenes`, payload);
  }
}
