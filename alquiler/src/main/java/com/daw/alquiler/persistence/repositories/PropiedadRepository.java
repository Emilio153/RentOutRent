package com.daw.alquiler.persistence.repositories;

import com.daw.alquiler.persistence.entities.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {
    // Spring Boot hace la magia y crea la query: SELECT * FROM propiedad WHERE propietario_id = ?
    List<Propiedad> findByPropietarioId(int propietarioId);
    
 // Busca propiedades donde la dirección O el título contengan el texto buscado (ignorando mayúsculas/minúsculas)
    List<Propiedad> findByDireccionContainingIgnoreCaseOrTituloContainingIgnoreCase(String direccion, String titulo);
}