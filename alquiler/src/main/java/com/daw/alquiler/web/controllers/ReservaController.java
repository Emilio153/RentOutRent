package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Reserva;
import com.daw.alquiler.services.MensajeService;
import com.daw.alquiler.services.ReservaService;
import com.daw.alquiler.services.exceptions.ReservaNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private MensajeService mensajeService;
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.reservaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.reservaService.findById(id));
        } catch (ReservaNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    
 // Importa el MensajeService e inyéctalo con @Autowired
    @GetMapping("/{id}/mensajes")
    public ResponseEntity<?> getMensajesByReserva(@PathVariable int id) {
        try {
            this.reservaService.findById(id); // Comprueba que la reserva existe
            return ResponseEntity.ok(this.mensajeService.findByReserva(id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Reserva reserva) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(this.reservaService.save(reserva));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la reserva");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Reserva reserva) {
        try {
            return ResponseEntity.ok(this.reservaService.update(id, reserva));
        } catch (ReservaNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.reservaService.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (ReservaNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}