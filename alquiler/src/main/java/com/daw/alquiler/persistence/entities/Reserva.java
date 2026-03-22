package com.daw.alquiler.persistence.entities;

import com.daw.alquiler.persistence.entities.enums.Estado;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reserva")
@Getter @Setter @NoArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private double total;
    @Enumerated(EnumType.STRING)
    private Estado estado;
    @Column(name = "creado_en")
    private LocalDateTime creadoEn;

    @PrePersist
    public void prePersist() {
        this.creadoEn = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "propiedad_id")
    private Propiedad propiedad;

    @ManyToOne
    @JoinColumn(name = "huesped_id")
    private Huesped huesped;
    
    @OneToMany(mappedBy = "reserva")
    @JsonIgnore
    private List<Mensaje> mensajes;
}
