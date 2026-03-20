package com.daw.alquiler.persistence.repositories;

import com.daw.alquiler.persistence.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // Magia JPA: Busca reservas filtrando por el propietario de la propiedad
    List<Reserva> findByPropiedadPropietarioId(int propietarioId);
    
 // Busca las reservas que pertenecen a un huésped concreto
    List<Reserva> findByHuespedId(int huespedId);
}