package com.daw.alquiler.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.alquiler.persistence.entities.Persona;


public interface PersonaRepository extends JpaRepository<Persona, Integer>{
	Persona findByEmail(String email);

}
