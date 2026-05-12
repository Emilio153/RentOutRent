import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropiedadesService, Propiedad } from '../../shared/services/propiedades.service';

@Component({
  selector: 'app-propiedad-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-propiedad.html',
  styleUrls: ['./detalle-propiedad.css']
})
export class DetallePropiedadComponent implements OnInit {
  // Inyectamos ActivatedRoute para poder leer el ID de la URL
  private route = inject(ActivatedRoute);
  private propiedadesService = inject(PropiedadesService);
  private cdr = inject(ChangeDetectorRef)
  propiedad: Propiedad | null = null;
  cargando: boolean = true;
  error: boolean = false;

  ngOnInit() {
    // 1. Extraemos el ID de la ruta (ej: /propiedad/3 -> sacamos el 3)
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    // 2. Si hay ID, llamamos a tu Spring Boot
    if (id) {
      this.cargarDetalles(id);
    } else {
      this.error = true;
      this.cargando = false;
    }
  }

  cargarDetalles(id: number) {
    // Asegúrate de tener este método getPropiedadById(id) creado en tu servicio
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