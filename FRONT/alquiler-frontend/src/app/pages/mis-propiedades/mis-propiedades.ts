import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { PropiedadesService } from '../../shared/services/propiedades.service';

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

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (miId) {
      this.usuariosService.misPropiedades(miId).subscribe({
        next: (data) => {
          this.propiedades = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error', err);
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  borrarPropiedad(id: number) {
    if(confirm('¿Estás seguro de que quieres borrar esta propiedad?')) {
      this.propiedadesService.borrarPropiedad(id).subscribe({
        next: () => {
          this.cargarPropiedades(); // Recargar la lista
        },
        error: (err) => console.error(err)
      });
    }
  }
}
