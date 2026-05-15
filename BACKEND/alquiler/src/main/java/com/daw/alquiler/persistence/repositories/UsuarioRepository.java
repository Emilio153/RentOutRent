package com.daw.alquiler.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.daw.alquiler.persistence.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByEmail(String email);
}