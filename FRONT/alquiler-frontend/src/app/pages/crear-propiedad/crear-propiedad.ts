import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // 🔥 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-propiedad.html',
  styleUrls: ['./crear-propiedad.css']
})
export class CrearPropiedadComponent implements OnInit {
  private propiedadesService = inject(PropiedadesService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // 🔥 2. Inyectamos el "megáfono" de Angular

  propiedad: Propiedad = {
    titulo: '',
    descripcion: '',
    direccion: '',
    precio_noche: 0,
    max_huespedes: 1,
    calendario: new Date().toISOString().split('T')[0]
  };
  
  editando: boolean = false;
  propiedadId?: number;
  imagenUrl: string = '';
  cargando = false;
  errorMensaje = '';

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.propiedadId = +id;
      this.cargarDatosParaEditar(this.propiedadId);
    }
  }

  cargarDatosParaEditar(id: number) {
    this.cargando = true;
    this.propiedadesService.getPropiedadById(id).subscribe({
      next: (data) => {
        this.propiedad = data;

        // 🔥 3. PARCHE: Si el calendario viene a null desde la BD, le ponemos la fecha de hoy
        if (!this.propiedad.calendario) {
          this.propiedad.calendario = new Date().toISOString().split('T')[0];
        }

        if (data.imagenes && data.imagenes.length > 0) {
          this.imagenUrl = data.imagenes[0].url;
        }
        
        this.cargando = false;
        
        // 🔥 4. ¡OBLIGAMOS AL HTML A REDIBUJARSE CON LOS DATOS!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.errorMensaje = 'No se han podido cargar los datos del alojamiento.';
        this.cargando = false;
        this.cdr.detectChanges(); // Redibujar también en caso de error
      }
    });
  }

  guardar() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      this.errorMensaje = 'No se ha podido identificar al propietario.';
      return;
    }

    this.cargando = true;
    this.propiedad.propietario = { id: miId };

    if (this.editando && this.propiedadId) {
      // ACTUALIZAR
      this.propiedadesService.actualizarPropiedad(this.propiedadId, this.propiedad).subscribe({
        next: () => this.gestionarImagenYRedirigir(this.propiedadId!),
        error: (err) => this.manejarError(err)
      });
    } else {
      // CREAR
      this.propiedadesService.crearPropiedad(this.propiedad).subscribe({
        next: (nueva) => this.gestionarImagenYRedirigir(nueva.id!),
        error: (err) => this.manejarError(err)
      });
    }
  }

  private gestionarImagenYRedirigir(id: number) {
    if (this.imagenUrl.trim()) {
      this.propiedadesService.anadirImagen(id, this.imagenUrl).subscribe({
        next: () => this.finalizar(),
        error: () => this.finalizar()
      });
    } else {
      this.finalizar();
    }
  }

  private finalizar() {
    setTimeout(() => {
      this.cargando = false;
      this.router.navigate(['/mis-propiedades']);
    }, 150);
  }

  private manejarError(err: any) {
    console.error(err);
    this.cargando = false;
    this.errorMensaje = 'Ha ocurrido un error al guardar los datos.';
    this.cdr.detectChanges(); // Refrescar por si acaso
  }
}