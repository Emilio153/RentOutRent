import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';

@Component({
  selector: 'app-mis-propiedades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-propiedades.html',
  styleUrls: ['./mis-propiedades.css']
})
export class MisPropiedadesComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  private propiedadesService = inject(PropiedadesService);

  propiedades: any[] = [];
  cargando = true;

misPropiedades: Propiedad[] = [];

  error: string = '';

  ngOnInit() {
    this.cargarMisPropiedades();
  }

cargarMisPropiedades() {
    // 🔥 Sacamos tu ID real del token y usamos el UsuariosService
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      this.error = 'No se ha podido identificar al usuario.';
      this.cargando = false;
      return;
    }

    this.usuariosService.misPropiedades(miId).subscribe({
      next: (datos) => {
        this.propiedades = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error del backend:', err);
        this.error = 'No se pudieron cargar tus propiedades. Revisa tu sesión.';
        this.cargando = false;
      }
    });
  }


  borrarPropiedad(id: number) {
    if(confirm('¿Estás seguro de que quieres borrar esta propiedad?')) {
      this.propiedadesService.borrarPropiedad(id).subscribe({
        next: () => {
          this.cargarMisPropiedades(); // Recargar la lista
        },
        error: (err) => console.error(err)
      });
    }
  }
}
