import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  
  private propiedadesService = inject(PropiedadesService);
  
  propiedades: Propiedad[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = true;

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    this.cargando = true;
    this.propiedadesService.listarPropiedades().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar propiedades:', err);
        this.cargando = false;
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
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.cargando = false;
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
}