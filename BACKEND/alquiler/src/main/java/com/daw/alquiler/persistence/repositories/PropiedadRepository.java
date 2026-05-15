package com.daw.alquiler.persistence.repositories;

import com.daw.alquiler.persistence.entities.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {

    // 1. Buscador público (Este ya lo tenías)
    List<Propiedad> findByDireccionContainingIgnoreCaseOrTituloContainingIgnoreCase(String direccion, String titulo);

    // 🔥 2. LA SOLUCIÓN: Le decimos a Spring en lenguaje SQL (HQL) que busque por "propietario.id"
    @Query("SELECT p FROM Propiedad p WHERE p.propietario.id = :usuarioId")
    List<Propiedad> findByUsuarioId(@Param("usuarioId") int usuarioId);

}