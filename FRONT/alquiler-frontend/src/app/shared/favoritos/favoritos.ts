import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Imports arreglados:
import { FavoritosService } from '../services/favoritos.service';
import { Propiedad } from '../services/propiedad';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent {

  private favoritosService = inject(FavoritosService);
  misFavoritos: Propiedad[] = [];

  constructor() {
    this.favoritosService.favoritos$.subscribe(favs => {
      this.misFavoritos = favs;
    });
  }

  quitarFavorito(casa: Propiedad) {
    this.favoritosService.toggleFavorito(casa);
  }
}