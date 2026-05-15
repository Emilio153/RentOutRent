import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 🔥 1. IMPORTANTE: Añadimos Router aquí a la importación
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';
import { ReservasService } from '../../shared/services/reservas.service';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-propiedad-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalle-propiedad.html',
  styleUrls: ['./detalle-propiedad.css']
})
export class DetallePropiedadComponent implements OnInit {
  private route = inject(ActivatedRoute);
  // 🔥 2. Inyectamos el router para poder navegar entre páginas
  private router = inject(Router); 
  
  private propiedadesService = inject(PropiedadesService);
  private reservasService = inject(ReservasService);
  private usuariosService = inject(UsuariosService);
  private cdr = inject(ChangeDetectorRef);
  
  propiedad: Propiedad | null = null;
  cargando: boolean = true;
  error: boolean = false;
  fechaInicio: string = '';
  fechaFin: string = '';
  noches: number = 0;
  totalEstimado: number = 0;
  creandoReserva: boolean = false;

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  calcularTotal() {
    if (this.fechaInicio && this.fechaFin && this.propiedad) {
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
      
      const diferenciaTiempo = fin.getTime() - inicio.getTime();
      this.noches = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

      if (this.noches > 0) {
        this.totalEstimado = this.noches * this.propiedad.precio_noche;
      } else {
        this.totalEstimado = 0;
        this.noches = 0;
      }
    }
  }

  hacerReserva() {
    const miId = this.usuariosService.obtenerMiIdDesdeToken();
    if (!miId) {
      alert("Debes iniciar sesión para reservar");
      this.router.navigate(['/login']);
      return;
    }

    // 🔥 3. Comprobación de seguridad para TypeScript
    if (!this.propiedad || !this.propiedad.id) {
        alert("Error: No se ha cargado la propiedad correctamente.");
        return;
    }

    this.creandoReserva = true;

    // Ahora TypeScript sabe seguro que "this.propiedad" no es null
    const nuevaReserva: any = {
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      total: this.totalEstimado,
      estado: 'PENDIENTE',
      propiedad: { id: this.propiedad.id },
      huesped: { id: miId }
    };

    this.reservasService.crearReserva(nuevaReserva).subscribe({
      next: (res) => {
        this.creandoReserva = false;
        alert("¡Reserva solicitada con éxito!");
        this.router.navigate(['/mis-reservas']); 
      },
      error: (err) => {
        console.error("Error al reservar", err);
        this.creandoReserva = false;
        alert("Hubo un problema al realizar la reserva.");
      }
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.cargarDetalles(id);
    } else {
      this.error = true;
      this.cargando = false;
    }
  }

  cargarDetalles(id: number) {
    this.propiedadesService.getPropiedadById(id).subscribe({
      next: (data) => {
        this.propiedad = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la propiedad:', err);
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}