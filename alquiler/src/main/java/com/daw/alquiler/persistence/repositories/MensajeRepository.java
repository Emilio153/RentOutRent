package com.daw.alquiler.persistence.repositories;

import com.daw.alquiler.persistence.entities.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    List<Mensaje> findByReservaId(int reservaId);
}