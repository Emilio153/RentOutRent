import { Component, inject, OnInit } from '@angular/core';
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

  reservaId: number = 0;
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  miId: number = 0;
  cargando = true;

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
        this.mensajes = data;
        this.cargando = false;
        this.scrollBottom();
      },
      error: (err) => {
        console.error('Error cargando chat:', err);
        this.cargando = false;
      }
    });
  }

  enviar() {
    if (!this.nuevoMensaje.trim() || !this.miId) return;

    // Para saber el receptor, necesitamos saber la reserva. 
    // Como simplificación para la UI (y porque no tenemos el objeto reserva cargado),
    // el backend normalmente deduce el receptor o lo toma del payload.
    // Vamos a buscar la reserva para sacar al otro usuario.
    this.reservasService.obtenerReservaPorId(this.reservaId).subscribe({
      next: (reserva) => {
        // Si yo soy el huesped, el receptor es el propietario
        // Si yo soy el propietario, el receptor es el huesped
        let receptorId = 0;
        if (reserva.huesped?.id === this.miId) {
          receptorId = reserva.propiedad?.propietario?.id || 0; // Ojo, la API debe devolver el prop.id
        } else {
          receptorId = reserva.huesped?.id || 0;
        }

        const msj: Mensaje = {
          contenido: this.nuevoMensaje,
          reserva: { id: this.reservaId },
          emisor: { id: this.miId },
          receptor: { id: receptorId } // Podría ser 0 si la API no lo pasa, el backend debería saberlo igual.
        };

        this.mensajesService.enviarMensaje(msj).subscribe({
          next: (msjGuardado) => {
            this.mensajes.push(msjGuardado); // O recargar TODO
            this.nuevoMensaje = '';
            this.scrollBottom();
          },
          error: (err) => console.error('Error enviando msj:', err)
        });
      }
    });
  }

  scrollBottom() {
    setTimeout(() => {
      const container = document.getElementById('chat-box');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}
