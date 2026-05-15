package com.daw.alquiler.persistence.repositories;

import com.daw.alquiler.persistence.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    // Este lo pilla automático porque la variable se llama "huesped"
    List<Reserva> findByHuespedId(int huespedId);

    // 🔥 Este necesita la Query explícita para que Spring no se pierda buscando al dueño
    @Query("SELECT r FROM Reserva r WHERE r.propiedad.propietario.id = :usuarioId")
    List<Reserva> findReservasRecibidasByUsuarioId(@Param("usuarioId") int usuarioId);
}