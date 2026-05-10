import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Propiedad } from './propiedades.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: Propiedad[] = [];
  private favoritosSubject = new BehaviorSubject<Propiedad[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();
  
  private userEmail: string = '';

  // 🔥 MÉTODO CLAVE: Se llama al iniciar sesión
  cargarFavoritosDelUsuario(email: string) {
    this.userEmail = email;
    const key = `ror_favoritos_${this.userEmail}`; // Ejemplo: ror_favoritos_maria@test.com
    const guardados = localStorage.getItem(key);
    
    this.favoritos = guardados ? JSON.parse(guardados) : [];
    this.favoritosSubject.next(this.favoritos);
  }

  toggleFavorito(propiedad: Propiedad) {
    if (!this.userEmail) return; // Si no hay usuario, no hacemos nada

    const indice = this.favoritos.findIndex(p => String(p.id) === String(propiedad.id));
    
    if (indice === -1) {
      this.favoritos.push(propiedad);
    } else {
      this.favoritos.splice(indice, 1);
    }

    // Guardamos en la caja específica de este usuario
    localStorage.setItem(`ror_favoritos_${this.userEmail}`, JSON.stringify(this.favoritos));
    this.favoritosSubject.next(this.favoritos);
  }

  esFavorito(id: number): boolean {
    return this.favoritos.some(p => String(p.id) === String(id));
  }

  // 🔥 LIMPIEZA SUAVE: Solo borra la memoria, NO el localStorage
  limpiarFavoritos() {
    this.favoritos = [];
    this.favoritosSubject.next([]);
    this.userEmail = ''; 
    // Ya NO hacemos localStorage.removeItem, así los datos siguen ahí para cuando vuelva
  }
}