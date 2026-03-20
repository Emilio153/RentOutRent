package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Persona;
import com.daw.alquiler.persistence.repositories.PersonaRepository;
import com.daw.alquiler.services.exceptions.PersonaNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService implements UserDetailsService{

    @Autowired
    private PersonaRepository personaRepository;

    public List<Persona> findAll() {
        return personaRepository.findAll();
    }

    public Persona findById(int id) {
        return personaRepository.findById(id)
                .orElseThrow(() -> new PersonaNotFoundException("No se encontró la persona con ID: " + id));
    }
    
    public Persona login(String email, String password) {
        Persona persona = personaRepository.findByEmail(email);
        if (persona == null || !persona.getPassword().equals(password)) {
            throw new RuntimeException("Credenciales inválidas");
        }
        return persona;
    }

    // Nota: El save, update y delete de usuarios nuevos se suele hacer en Propietario/Huesped
    public void deleteById(int id) {
        if (!personaRepository.existsById(id)) {
            throw new PersonaNotFoundException("No se puede eliminar. Persona no encontrada");
        }
        personaRepository.deleteById(id);
    }
 // ====================================================================
    // MÉTODO OBLIGATORIO DE USERDETAILSSERVICE
    // ====================================================================
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // En nuestro caso, el 'username' es el email
        Persona persona = personaRepository.findByEmail(username);
        
        if (persona == null) {
            throw new UsernameNotFoundException("El usuario con email " + username + " no existe.");
        }
        
        // Devolvemos la entidad Persona (que ya implementa UserDetails)
        return persona; 
    }
}