import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Propiedad } from '../../pages/catalogo/catalogo';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: Propiedad[] = [];
  private favoritosSubject = new BehaviorSubject<Propiedad[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();

  constructor() {
    const guardados = localStorage.getItem('ror_favoritos');
    if (guardados) {
      this.favoritos = JSON.parse(guardados);
      this.favoritosSubject.next(this.favoritos);
    }
  }

  toggleFavorito(propiedad: Propiedad) {
    const indice = this.favoritos.findIndex(p => p.id === propiedad.id);
    if (indice === -1) {
      this.favoritos.push(propiedad);
    } else {
      this.favoritos.splice(indice, 1);
    }
    localStorage.setItem('ror_favoritos', JSON.stringify(this.favoritos));
    this.favoritosSubject.next(this.favoritos);
  }

  esFavorito(id: number): boolean {
    return this.favoritos.some(p => p.id === id);
  }
}