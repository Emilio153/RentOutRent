import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service'; // Asegúrate de importar Propiedad
import { FavoritosService } from '../../shared/services/favoritos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  private favoritosService = inject(FavoritosService);
  private propiedadesService = inject(PropiedadesService);
  private cdr = inject(ChangeDetectorRef);
  
  propiedades: Propiedad[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = true;

  ngOnInit() {
    this.cargarPropiedades();

    // 🔥 ¡ESTA ES LA MAGIA QUE FALTABA!
    // Nos suscribimos al servicio. Cuando la BD responda con tus favoritos, 
    // el servicio avisará por aquí y forzaremos el repintado de los corazones.
    this.favoritosService.favoritos$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  cargarPropiedades() {
    this.cargando = true;
    this.propiedadesService.listarPropiedades().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar propiedades:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscar() {
    if (!this.terminoBusqueda.trim()) {
      this.cargarPropiedades();
      return;
    }
    this.cargando = true;
    this.propiedadesService.buscarPropiedades(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.propiedades = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
  
  getImagen(propiedad: Propiedad): string {
    if (propiedad.imagenes && propiedad.imagenes.length > 0) {
      return propiedad.imagenes[0].url;
    }
    // Imagen por defecto si no tiene ninguna
    return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
  }
  
  toggleFavorito(casa: Propiedad, event: Event) {
    event.stopPropagation(); // Evita que se abra la tarjeta entera al darle al corazón
    this.favoritosService.toggleFavorito(casa);
  }

  esFavorito(id: number): boolean {
    return this.favoritosService.esFavorito(id);
  }
}