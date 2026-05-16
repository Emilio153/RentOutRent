import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  private router = inject(Router);
  
  // Variable que controlará la inclinación 3D del globo
  globeTransform: string = 'rotateX(0deg) rotateY(0deg)';

  // Escuchamos el movimiento del ratón en toda la pantalla
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Calculamos la posición del ratón respecto al centro de la pantalla
    const x = (window.innerWidth / 2 - event.clientX) / 25;
    const y = (window.innerHeight / 2 - event.clientY) / 25;

    // Actualizamos la inclinación (efecto Parallax)
    this.globeTransform = `rotateX(${y}deg) rotateY(${-x}deg)`;
  }

  entrarAlCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}