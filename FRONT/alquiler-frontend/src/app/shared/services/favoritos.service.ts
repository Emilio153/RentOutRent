import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'http://localhost:8092/api/usuarios';
  private http = inject(HttpClient);
  private usuariosService = inject(UsuariosService);
  private authService = inject(AuthService);

  private favoritosSubject = new BehaviorSubject<any[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();

  constructor() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.cargarFavoritosDelServidor();
      } else {
        this.favoritosSubject.next([]); 
      }
    });
  }

  cargarFavoritosDelServidor() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (miId) {
      this.http.get<any[]>(`${this.apiUrl}/${miId}/favoritos`).subscribe({
        next: (favs) => this.favoritosSubject.next(favs),
        error: (err) => console.error('Error cargando favoritos', err)
      });
    }
  }

  toggleFavorito(propiedad: any) {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      alert('Debes iniciar sesión para añadir a favoritos');
      return;
    }

    const actuales = this.favoritosSubject.value;
    const esFavorito = actuales.some(p => p.id === propiedad.id);

    if (esFavorito) {
      // 💔 1. ACTUALIZACIÓN OPTIMISTA: Lo quitamos al instante visualmente
      this.favoritosSubject.next(actuales.filter(p => p.id !== propiedad.id));

      // 2. Avisamos al servidor por detrás (con responseType text para evitar fallos de lectura)
      this.http.delete(`${this.apiUrl}/${miId}/favoritos/${propiedad.id}`, { responseType: 'text' }).subscribe({
        error: (err) => {
          console.error('Fallo al quitar del servidor:', err);
          this.favoritosSubject.next(actuales); // Si falla la BD, deshacemos el cambio
        }
      });
    } else {
      // 💖 1. ACTUALIZACIÓN OPTIMISTA: Lo añadimos al instante visualmente
      this.favoritosSubject.next([...actuales, propiedad]);

      // 2. Avisamos al servidor por detrás
      this.http.post(`${this.apiUrl}/${miId}/favoritos/${propiedad.id}`, {}, { responseType: 'text' }).subscribe({
        error: (err) => {
          console.error('Fallo al añadir al servidor:', err);
          this.favoritosSubject.next(actuales); // Si falla la BD, deshacemos el cambio
        }
      });
    }
  }

  esFavorito(propiedadId: number): boolean {
    return this.favoritosSubject.value.some(p => p.id === propiedadId);
  }

  limpiarFavoritos() {
    this.favoritosSubject.next([]);
  }
}