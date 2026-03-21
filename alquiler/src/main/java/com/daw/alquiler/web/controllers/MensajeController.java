package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Mensaje;
import com.daw.alquiler.services.MensajeService;
import com.daw.alquiler.services.exceptions.MensajeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "*")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    // ==========================================
    // RUTAS PRIVADAS (Necesitan Token JWT)
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Mensaje>> listarTodos() {
        return ResponseEntity.ok(mensajeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            return ResponseEntity.ok(mensajeService.findById(id));
        } catch (MensajeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // Endpoint clave para cargar el chat de una reserva en Angular
    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<List<Mensaje>> obtenerChatDeReserva(@PathVariable int reservaId) {
        return ResponseEntity.ok(mensajeService.findByReserva(reservaId));
    }

    @PostMapping
    public ResponseEntity<?> enviarMensaje(@RequestBody Mensaje mensaje) {
        try {
            Mensaje nuevoMensaje = mensajeService.save(mensaje);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoMensaje);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al enviar el mensaje\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarMensaje(@PathVariable int id) {
        try {
            mensajeService.deleteById(id);
            return ResponseEntity.ok("{\"mensaje\": \"Mensaje borrado con éxito\"}");
        } catch (MensajeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"No se pudo borrar el mensaje\"}");
        }
    }
}