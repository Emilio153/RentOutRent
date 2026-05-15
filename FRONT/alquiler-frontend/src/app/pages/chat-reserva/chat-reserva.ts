import { Component, inject, OnInit, ChangeDetectorRef, NgZone } from '@angular/core'; // 🔥 Importamos NgZone
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MensajesService, Mensaje } from '../../shared/services/mensajes.service';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ReservasService } from '../../shared/services/reservas.service';

@Component({
  selector: 'app-chat-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat-reserva.html',
  styleUrls: ['./chat-reserva.css']
})
export class ChatReservaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mensajesService = inject(MensajesService);
  private usuariosService = inject(UsuariosService);
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone); // 🔥 Inyectamos el gestor de zonas

  reservaId: number = 0;
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  miId: number = 0;
  
  cargando = true;
  enviando = false;

  ngOnInit() {
    this.miId = this.usuariosService.obtenerMiIdDesdeToken() || 0;
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.reservaId = Number(idParam);
      this.cargarMensajes();
    }
  }

  cargarMensajes() {
    this.mensajesService.obtenerMensajesPorReserva(this.reservaId).subscribe({
      next: (data) => {
        // 🔥 NgZone.run asegura que la actualización de variables dispare el dibujado
        this.ngZone.run(() => {
          this.mensajes = data;
          this.cargando = false;
          this.cdr.detectChanges(); // Forzamos dibujado
          setTimeout(() => this.scrollBottom(), 100); // Bajamos el scroll
        });
      },
      error: (err) => {
        console.error('Error cargando chat:', err);
        this.ngZone.run(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  enviar() {
    if (!this.nuevoMensaje.trim() || !this.miId || this.enviando) return;
    
    this.enviando = true;

    this.reservasService.obtenerReservaPorId(this.reservaId).subscribe({
      next: (reserva) => {
        let receptorId = 0;
        if (reserva.huesped?.id === this.miId) {
          receptorId = reserva.propiedad?.propietario?.id || 0;
        } else {
          receptorId = reserva.huesped?.id || 0;
        }

        const msj: Mensaje = {
          contenido: this.nuevoMensaje,
          reserva: { id: this.reservaId },
          emisor: { id: this.miId },
          receptor: { id: receptorId }
        };

        this.mensajesService.enviarMensaje(msj).subscribe({
          next: (msjGuardado) => {
            // 🔥 También aquí usamos NgZone para el nuevo mensaje
            this.ngZone.run(() => {
              this.mensajes.push(msjGuardado);
              this.nuevoMensaje = '';
              this.enviando = false;
              this.cdr.detectChanges();
              setTimeout(() => this.scrollBottom(), 50);
            });
          },
          error: (err) => {
            console.error('Error enviando msj:', err);
            this.ngZone.run(() => {
              this.enviando = false;
              this.cdr.detectChanges();
            });
          }
        });
      }
    });
  }

  scrollBottom() {
    const container = document.getElementById('chat-box');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}