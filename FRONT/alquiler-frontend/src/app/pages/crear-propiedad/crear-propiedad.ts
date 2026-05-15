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
    // 1. Crear propiedad
    this.propiedadesService.crearPropiedad(this.propiedad).subscribe({
      next: (nuevaPropiedad) => {
        console.log('Propiedad creada:', nuevaPropiedad);
        
        if (this.imagenUrl.trim() && nuevaPropiedad && nuevaPropiedad.id) {
          this.propiedadesService.anadirImagen(nuevaPropiedad.id, this.imagenUrl).subscribe({
            next: () => {
              this.finalizarGuardado();
            },
            error: (err) => {
              console.error('Error imagen:', err);
              this.finalizarGuardado(); // Redirigimos aunque falle la imagen
            }
          });
        } else {
          this.finalizarGuardado();
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = 'Error al publicar la propiedad.';
      }
    });
  }

  // Método auxiliar para asegurar que siempre redirige
  private finalizarGuardado() {
    this.cargando = false;
    this.router.navigate(['/mis-propiedades']).then(() => {
        console.log('Navegación completada a mis-propiedades');
    });
  }
}
