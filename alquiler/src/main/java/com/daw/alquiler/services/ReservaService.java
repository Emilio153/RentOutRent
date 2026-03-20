package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Reserva;
import com.daw.alquiler.persistence.repositories.ReservaRepository;
import com.daw.alquiler.services.exceptions.ReservaNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Reserva findById(int id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ReservaNotFoundException("No se encontró la reserva con ID: " + id));
    }
    
    public List<Reserva> findByPropietario(int propietarioId) {
        return reservaRepository.findByPropiedadPropietarioId(propietarioId);
    }
    public List<Reserva> findByHuesped(int huespedId) {
        return reservaRepository.findByHuespedId(huespedId);
    }

    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Reserva update(int id, Reserva reservaDetalles) {
        Reserva reserva = this.findById(id); // Reutilizamos el método que ya lanza la excepción
        
        reserva.setFecha_inicio(reservaDetalles.getFecha_inicio());
        reserva.setFecha_fin(reservaDetalles.getFecha_fin());
        reserva.setTotal(reservaDetalles.getTotal());
        reserva.setEstado(reservaDetalles.getEstado());
        
        return reservaRepository.save(reserva);
    }

    public void deleteById(int id) {
        if (!reservaRepository.existsById(id)) {
            throw new ReservaNotFoundException("No se puede eliminar. Reserva no encontrada con ID: " + id);
        }
        reservaRepository.deleteById(id);
    }
}