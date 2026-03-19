package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Propietario;
import com.daw.alquiler.persistence.repositories.PropietarioRepository;
import com.daw.alquiler.services.exceptions.PropietarioNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropietarioService {

    @Autowired
    private PropietarioRepository propietarioRepository;

    public List<Propietario> findAll() {
        return propietarioRepository.findAll();
    }

    public Propietario findById(int id) {
        return propietarioRepository.findById(id)
                .orElseThrow(() -> new PropietarioNotFoundException("No se encontró el propietario con ID: " + id));
    }

    public Propietario save(Propietario propietario) {
        return propietarioRepository.save(propietario);
    }

    public Propietario update(int id, Propietario detalles) {
        Propietario propietario = this.findById(id);
        
        propietario.setNombre(detalles.getNombre());
        propietario.setEmail(detalles.getEmail());
        propietario.setTelefono(detalles.getTelefono());
        // Nota: DNI y Password normalmente tienen lógicas separadas, pero puedes añadirlos aquí si lo necesitas en tu MVP
        
        return propietarioRepository.save(propietario);
    }

    public void deleteById(int id) {
        if (!propietarioRepository.existsById(id)) {
            throw new PropietarioNotFoundException("No se puede eliminar. Propietario no encontrado con ID: " + id);
        }
        propietarioRepository.deleteById(id);
    }
}