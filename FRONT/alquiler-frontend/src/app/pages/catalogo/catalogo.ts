import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { PropiedadService, Propiedad } from '../../shared/services/propiedad';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  private favoritosService = inject(FavoritosService);
  private propiedadService = inject(PropiedadService);
  
  propiedades: Propiedad[] = [];
  cargando: boolean = true;

  ngOnInit() {
    // Al arrancar la pantalla, llamamos al backend
    this.propiedadService.getPropiedades().subscribe({
      next: (datos) => {
        this.propiedades = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar las propiedades', err);
        this.cargando = false;
      }
    });
  }

  toggleFavorito(casa: Propiedad) {
    this.favoritosService.toggleFavorito(casa);
  }

  esFavorito(id: number): boolean {
    return this.favoritosService.esFavorito(id);
  }

  // Método auxiliar para extraer la primera imagen o poner una por defecto
  getPrimeraImagen(casa: Propiedad): string {
    if (casa.imagenes && casa.imagenes.length > 0) {
      return casa.imagenes[0].url;
    }
    // Imagen por defecto si la casa aún no tiene fotos
    return 'https://images.unsplash.com/photo-1518780602344-9f58cdceb3e5?auto=format&fit=crop&w=800&q=80';
  }
}