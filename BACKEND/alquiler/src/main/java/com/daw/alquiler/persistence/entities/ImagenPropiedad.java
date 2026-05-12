package com.daw.alquiler.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "imagen_propiedad")
@Getter @Setter @NoArgsConstructor
public class ImagenPropiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String url;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "propiedad_id")
    private Propiedad propiedad;
}