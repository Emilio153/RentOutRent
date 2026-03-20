package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Mensaje;
import com.daw.alquiler.services.MensajeService;
import com.daw.alquiler.services.exceptions.MensajeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "*")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.mensajeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.mensajeService.findById(id));
        } catch (MensajeNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Mensaje mensaje) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(this.mensajeService.save(mensaje));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear el mensaje");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.mensajeService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (MensajeNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}