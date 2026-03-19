package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Huesped;
import com.daw.alquiler.persistence.repositories.HuespedRepository;
import com.daw.alquiler.services.exceptions.HuespedNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HuespedService {

    @Autowired
    private HuespedRepository huespedRepository;

    public List<Huesped> findAll() {
        return huespedRepository.findAll();
    }

    public Huesped findById(int id) {
        return huespedRepository.findById(id)
                .orElseThrow(() -> new HuespedNotFoundException("No se encontró el huésped con ID: " + id));
    }

    public Huesped save(Huesped huesped) {
        return huespedRepository.save(huesped);
    }

    public Huesped update(int id, Huesped detalles) {
        Huesped huesped = this.findById(id);
        
        huesped.setNombre(detalles.getNombre());
        huesped.setEmail(detalles.getEmail());
        huesped.setTelefono(detalles.getTelefono());
        
        return huespedRepository.save(huesped);
    }

    public void deleteById(int id) {
        if (!huespedRepository.existsById(id)) {
            throw new HuespedNotFoundException("No se puede eliminar. Huésped no encontrado con ID: " + id);
        }
        huespedRepository.deleteById(id);
    }
}