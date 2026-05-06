import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';
import { ReservasService, Reserva } from '../../shared/services/reservas.service';
import { AuthService } from '../../auth';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalle-propiedad.html',
  styleUrls: ['./detalle-propiedad.css']
})
export class DetallePropiedadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private propiedadesService = inject(PropiedadesService);
  private reservasService = inject(ReservasService);
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);

  propiedad: Propiedad | null = null;
  cargando = true;

  // Formulario de reserva
  fechaInicio: string = '';
  fechaFin: string = '';
  cargandoReserva = false;
  mensajeReserva = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarPropiedad(Number(id));
    }
  }

  cargarPropiedad(id: number) {
    this.propiedadesService.obtenerPropiedadPorId(id).subscribe({
      next: (data) => {
        this.propiedad = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar la propiedad', err);
        this.cargando = false;
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  calcularTotal(): number {
    if (!this.fechaInicio || !this.fechaFin || !this.propiedad) return 0;
    
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);
    
    if (fin <= inicio) return 0;

    const diffTime = Math.abs(fin.getTime() - inicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays * this.propiedad.precio_noche;
  }

  reservar() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.fechaInicio || !this.fechaFin) {
      this.mensajeReserva = 'Por favor, selecciona las fechas.';
      return;
    }

    const total = this.calcularTotal();
    if (total <= 0) {
      this.mensajeReserva = 'Fechas inválidas.';
      return;
    }

    const huespedId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!huespedId) {
      this.mensajeReserva = 'Error: no se pudo obtener tu ID de usuario.';
      return;
    }

    const nuevaReserva: Reserva = {
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      total: total,
      estado: 'PENDIENTE',
      propiedad: { id: this.propiedad!.id },
      huesped: { id: huespedId }
    };

    this.cargandoReserva = true;
    this.mensajeReserva = '';

    this.reservasService.crearReserva(nuevaReserva).subscribe({
      next: () => {
        this.cargandoReserva = false;
        alert('Reserva solicitada con éxito. El propietario debe confirmarla.');
        this.router.navigate(['/mis-reservas']);
      },
      error: (err) => {
        this.cargandoReserva = false;
        this.mensajeReserva = 'Error al crear la reserva.';
        console.error(err);
      }
    });
  }
}
