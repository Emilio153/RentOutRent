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
  getPropiedadById(id: number): Observable<Propiedad> {
    // Llama a tu endpoint de Spring Boot, ej: http://localhost:8092/api/propiedades/3
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }

  obtenerPropiedadPorId(id: number): Observable<Propiedad> {
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
  // 🔥 NUEVO MÉTODO: Traer solo las propiedades del propietario logueado
  getMisPropiedades(): Observable<Propiedad[]> {
    // 1. Recuperamos el token que guardaste al hacer Login
    const token = localStorage.getItem('token'); // Asegúrate de que el nombre coincide con cómo lo guardas en el login
    
    // 2. Preparamos las cabeceras de seguridad
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // 3. Hacemos la petición (Asegúrate de que la URL coincide con la de tu controlador de Spring Boot)
    // Normalmente es algo como /api/propiedades/propietario o /api/propiedades/mis-propiedades
    return this.http.get<Propiedad[]>(`${this.apiUrl}/mis-propiedades`, { headers });
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
