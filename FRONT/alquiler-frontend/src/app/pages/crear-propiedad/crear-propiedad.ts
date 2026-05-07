import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-propiedad.html',
  styleUrls: ['./crear-propiedad.css']
})
export class CrearPropiedadComponent {
  private propiedadesService = inject(PropiedadesService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  propiedad: Propiedad = {
    titulo: '',
    descripcion: '',
    direccion: '',
    precio_noche: 0,
    max_huespedes: 1,
    calendario: new Date().toISOString().split('T')[0] // Fecha de hoy
  };
  
  imagenUrl: string = '';
  cargando = false;
  errorMensaje = '';

  guardar() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      this.errorMensaje = 'No se ha podido identificar al propietario.';
      return;
    }

    this.cargando = true;
    this.propiedad.propietario = { id: miId };

    // 1. Crear propiedad
    this.propiedadesService.crearPropiedad(this.propiedad).subscribe({
      next: (nuevaPropiedad) => {
        // 2. Si hay imagen, la añadimos llamando al endpoint de imágenes
        if (this.imagenUrl.trim() && nuevaPropiedad.id) {
          this.propiedadesService.anadirImagen(nuevaPropiedad.id, this.imagenUrl).subscribe({
            next: () => {
              this.cargando = false;
              this.router.navigate(['/mis-propiedades']);
            },
            error: (err) => {
              console.error('Error al subir imagen', err);
              this.cargando = false;
              // Navegamos igual, la propiedad se creó
              this.router.navigate(['/mis-propiedades']);
            }
          });
        } else {
          this.cargando = false;
          this.router.navigate(['/mis-propiedades']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = 'Error al publicar la propiedad.';
        console.error(err);
      }
    });
  }
}
