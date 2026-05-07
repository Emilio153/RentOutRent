import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// La interfaz debe coincidir EXACTAMENTE con lo que devuelve tu Spring Boot
export interface ImagenPropiedad {
  id: number;
  url: string;
}

export interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio_noche: number;
  max_huespedes: number;
  calendario: string;
  imagenes?: ImagenPropiedad[]; // El backend devuelve una lista de imágenes
}

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8092/api/propiedades';

  // Obtener todas las propiedades (Ruta pública)
  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  // Obtener una sola propiedad
  getPropiedadById(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }
}