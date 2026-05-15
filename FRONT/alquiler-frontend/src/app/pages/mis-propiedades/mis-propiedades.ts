import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // 🔥 Importamos el motor de dibujado
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
  private cdr = inject(ChangeDetectorRef); // 🔥 Inyectamos el megáfono de Angular

  propiedades: any[] = [];
  cargando = true;
  error: string = '';

  ngOnInit() {
    this.cargarMisPropiedades();
  }

  cargarMisPropiedades() {
    this.cargando = true;
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
        // 🔥 ¡OBLIGAMOS AL HTML A REDIBUJARSE INMEDIATAMENTE!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error del backend:', err);
        this.error = 'No se pudieron cargar tus propiedades. Revisa tu sesión.';
        this.cargando = false;
        this.cdr.detectChanges(); // Lo forzamos también en caso de error
      }
    });
  }

  borrarPropiedad(id: number) {
    if(confirm('¿Estás seguro de que quieres borrar esta propiedad?')) {
      this.propiedadesService.borrarPropiedad(id).subscribe({
        next: () => {
          this.cargarMisPropiedades(); 
        },
        error: (err) => console.error(err)
      });
    }
  }
}