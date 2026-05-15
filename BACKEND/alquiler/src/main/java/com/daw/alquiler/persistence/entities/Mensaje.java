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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserva_id", nullable = false)
    @JsonIgnoreProperties({"fecha_inicio", "fecha_fin", "total", "estado", "creadoEn", "propiedad", "huesped","hibernateLazyInitializer", "handler"}) 
    private Reserva reserva;

    // 🔥 CORRECCIÓN: Ahora usan 'Usuario', no 'Persona'
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emisor_id", nullable = false)
    @JsonIgnoreProperties({"email", "telefono", "password", "rol", "hibernateLazyInitializer", "handler"})
    private Usuario emisor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptor_id", nullable = false)
    @JsonIgnoreProperties({"email", "telefono", "password", "rol", "hibernateLazyInitializer", "handler"})
    private Usuario receptor;
    
    @Column(name = "enviado_en")
    private LocalDateTime enviadoEn;
}