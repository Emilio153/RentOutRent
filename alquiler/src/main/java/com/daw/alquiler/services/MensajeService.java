package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Mensaje;
import com.daw.alquiler.persistence.repositories.MensajeRepository;
import com.daw.alquiler.services.exceptions.MensajeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    public List<Mensaje> findAll() {
        return mensajeRepository.findAll();
    }

    public Mensaje findById(int id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new MensajeNotFoundException("No se encontró el mensaje con ID: " + id));
    }
    
    public List<Mensaje> findByReserva(int reservaId) {
        return mensajeRepository.findByReservaId(reservaId);
    }

    public Mensaje save(Mensaje mensaje) {
        return mensajeRepository.save(mensaje);
    }

    public void deleteById(int id) {
        if (!mensajeRepository.existsById(id)) {
            throw new MensajeNotFoundException("No se puede eliminar. Mensaje no encontrado con ID: " + id);
        }
        mensajeRepository.deleteById(id);
    }
}