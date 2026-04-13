import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 1. Corregimos la ruta del servicio (un paso hacia atrás para salir de la carpeta 'favoritos')
import { FavoritosService } from '../services/favoritos';
import { Propiedad } from '../../../pages/catalogo/catalogo';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
// 2. Corregimos el nombre de la clase con Mayúscula para que coincida con las rutas
export class FavoritosComponent {

  // 3. Inyectamos el SERVICIO correctamente
  private favoritosService = inject(FavoritosService);

  misFavoritos: Propiedad[] = [];

  constructor() {
    // 4. Usamos la variable correcta (this.favoritosService)
    this.favoritosService.favoritos$.subscribe(favs => {
      this.misFavoritos = favs;
    });
  }

  quitarFavorito(casa: Propiedad) {
    this.favoritosService.toggleFavorito(casa);
  }
}