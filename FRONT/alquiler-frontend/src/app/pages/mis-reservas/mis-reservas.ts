import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  reservas: any[] = [];
  cargando = true;
  rolUsuario: string | null = '';
  
  // 🔥 Controla qué pestaña está activa
  viendoRecibidas = false; 

  ngOnInit() {
    this.rolUsuario = this.authService.getRolUsuario();
    // Si eres propietario, por defecto te enseñamos las que te han hecho a ti
    this.viendoRecibidas = this.esPropietarioReal; 
    this.cargarReservas();
  }

  get esPropietarioReal(): boolean {
    return this.rolUsuario === 'PROPIETARIO' || this.rolUsuario === 'ROLE_PROPIETARIO';
  }

  // 🔥 Método para cambiar de pestaña
  setVista(verRecibidas: boolean) {
    this.viendoRecibidas = verRecibidas;
    this.cargarReservas();
  }

cargarReservas() {
    this.cargando = true;
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) return;

    if (this.viendoRecibidas) {
      this.usuariosService.misReservasRecibidas(miId).subscribe({
        next: (data) => { 
          // 🔥 FILTRAMOS LAS ARCHIVADAS PARA QUE NO SE VEAN
          this.reservas = data.filter((r: any) => r.estado !== 'ARCHIVADA'); 
          this.cargando = false; 
          this.cdr.detectChanges(); 
        },
        error: () => { this.cargando = false; this.cdr.detectChanges(); }
      });
    } else {
      this.usuariosService.misReservasRealizadas(miId).subscribe({
        next: (data) => { 
          // 🔥 FILTRAMOS LAS ARCHIVADAS AQUÍ TAMBIÉN
          this.reservas = data.filter((r: any) => r.estado !== 'ARCHIVADA'); 
          this.cargando = false; 
          this.cdr.detectChanges(); 
        },
        error: () => { this.cargando = false; this.cdr.detectChanges(); }
      });
    }
  }
  // 🔥 Función para obtener la imagen de la propiedad de la reserva
  getImagen(propiedad: any): string {
    if (propiedad && propiedad.imagenes && propiedad.imagenes.length > 0) {
      return propiedad.imagenes[0].url;
    }
    // Imagen por defecto si no hay ninguna
    return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=200&q=80';
  }

  cambiarEstado(reservaId: number, estado: string) {
    if(confirm(`¿Seguro que quieres marcar la reserva como ${estado}?`)) {
      this.reservasService.actualizarEstadoReserva(reservaId, estado).subscribe({
        next: () => this.cargarReservas(),
        error: (err) => console.error(err)
      });
    }
  }
}