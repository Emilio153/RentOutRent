package com.daw.alquiler.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "propiedad")
@Getter @Setter @NoArgsConstructor
public class Propiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    private String direccion;
    
    private double precio_noche;
    
    private int max_huespedes;
    
    private LocalDate calendario; // Según tus specs

    @ManyToOne
    // 🔥 CORRECCIÓN VITAL: El nombre en la BD es usuario_id, no propietario_id
    @JoinColumn(name = "usuario_id")
    private Usuario propietario;

    @OneToMany(mappedBy = "propiedad", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ImagenPropiedad> imagenes;

    @OneToMany(mappedBy = "propiedad")
    @JsonIgnore
    private List<Reserva> reservas;
}
