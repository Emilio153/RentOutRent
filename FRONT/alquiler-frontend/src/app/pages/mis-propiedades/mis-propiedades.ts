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
    this.propiedadesService.getMisPropiedades().subscribe({
      next: (datos) => {
        this.misPropiedades = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error del backend:', err);
        // Si da un error 403 o 401, suele ser porque el token ha caducado o está mal
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
