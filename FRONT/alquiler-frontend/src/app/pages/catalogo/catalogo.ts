import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Definimos la estructura de una Casa/Propiedad
export interface Propiedad {
  id: number;
  titulo: string;
  ubicacion: string;
  precioPorNoche: number;
  imagenUrl: string;
  valoracion: number;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent {
  
  // Datos de prueba (Mock Data) para poder maquetar
  propiedades: Propiedad[] = [
    {
      id: 1,
      titulo: 'Villa de Lujo con Piscina Infinita',
      ubicacion: 'Marbella, Málaga',
      precioPorNoche: 350,
      imagenUrl: 'https://images.unsplash.com/photo-1613490908592-15f736c0ce75?auto=format&fit=crop&w=800&q=80',
      valoracion: 4.9
    },
    {
      id: 2,
      titulo: 'Ático Moderno en el Centro',
      ubicacion: 'Madrid Capital',
      precioPorNoche: 120,
      imagenUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d0d9?auto=format&fit=crop&w=800&q=80',
      valoracion: 4.7
    },
    {
      id: 3,
      titulo: 'Cabaña Rústica en la Montaña',
      ubicacion: 'Pirineos, Huesca',
      precioPorNoche: 85,
      imagenUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      valoracion: 4.8
    },
    {
      id: 4,
      titulo: 'Casa Frente al Mar',
      ubicacion: 'Ibiza, Baleares',
      precioPorNoche: 450,
      imagenUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      valoracion: 5.0
    }
  ];

}