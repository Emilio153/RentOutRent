package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Huesped;
import com.daw.alquiler.services.HuespedService;
import com.daw.alquiler.services.exceptions.HuespedNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/huespedes")
@CrossOrigin(origins = "*")
public class HuespedController {

    @Autowired
    private HuespedService huespedService;

    @GetMapping
    public ResponseEntity<List<Huesped>> listarTodos() {
        return ResponseEntity.ok(huespedService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            return ResponseEntity.ok(huespedService.findById(id));
        } catch (HuespedNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarHuesped(@PathVariable int id, @RequestBody Huesped detalles) {
        try {
            Huesped actualizado = huespedService.update(id, detalles);
            return ResponseEntity.ok(actualizado);
        } catch (HuespedNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al actualizar el huésped\"}");
        }
    }
}