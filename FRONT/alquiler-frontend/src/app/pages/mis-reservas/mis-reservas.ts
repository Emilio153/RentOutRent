import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { AuthService } from '../../auth';
import { ReservasService } from '../../shared/services/reservas.service';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-reservas.html',
  styleUrls: ['./mis-reservas.css']
})
export class MisReservasComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  private authService = inject(AuthService);
  private reservasService = inject(ReservasService);

  reservas: any[] = [];
  cargando = true;
  rolUsuario: string | null = '';

  ngOnInit() {
    this.rolUsuario = this.authService.getRolUsuario();
    this.cargarReservas();
  }

  get esPropietario(): boolean {
    return this.rolUsuario === 'USUARIO' || this.rolUsuario === 'ROLE_USUARIO';
  }

  cargarReservas() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      this.cargando = false;
      return;
    }

    if (this.esPropietario) {
      // Como propietario, ve las reservas que LE HAN HECHO a sus casas
      this.usuariosService.misReservasRecibidas(miId).subscribe({
        next: (data) => {
          this.reservas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.cargando = false;
        }
      });
    } else {
      // Como huésped, ve las reservas que HA HECHO
      this.usuariosService.misReservasRealizadas(miId).subscribe({
        next: (data) => {
          this.reservas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.cargando = false;
        }
      });
    }
  }

  cambiarEstado(reservaId: number, estado: string) {
    if(confirm(`¿Seguro que quieres marcar la reserva como ${estado}?`)) {
      this.reservasService.actualizarEstadoReserva(reservaId, estado).subscribe({
        next: () => {
          this.cargarReservas(); // Recargar tras el cambio
        },
        error: (err) => console.error(err)
      });
    }
  }
}
