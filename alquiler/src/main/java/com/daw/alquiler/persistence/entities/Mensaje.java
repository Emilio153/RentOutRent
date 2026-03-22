package com.daw.alquiler.persistence.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mensaje")
@Getter @Setter @NoArgsConstructor
public class Mensaje {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    // Relación opcional con reserva
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserva_id", nullable = false)
    @JsonIgnoreProperties({"fecha_inicio", "fecha_fin", "total", "estado", "creadoEn", "propiedad", "huesped","hibernateLazyInitializer", "handler"}) // Ignora todo esto de la reserva
    private Reserva reserva;

    // Emisor y Receptor son Personas
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emisor_id", nullable = false)
    @JsonIgnoreProperties({"email", "telefono", "username","hibernateLazyInitializer", "handler"}) // Solo dejará el ID y el Nombre
    private Persona emisor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptor_id", nullable = false)
    @JsonIgnoreProperties({"email", "telefono", "username","hibernateLazyInitializer", "handler"}) // Solo dejará el ID y el Nombre
    private Persona receptor;
    
    @Column(name = "enviado_en")
    private LocalDateTime enviadoEn;
}
