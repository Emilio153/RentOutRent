package com.daw.alquiler.controllers;

import com.daw.alquiler.persistence.entities.Huesped;
import com.daw.alquiler.services.HuespedService;
import com.daw.alquiler.services.exceptions.HuespedNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/huespedes")
@CrossOrigin(origins = "*")
public class HuespedController {

    @Autowired
    private HuespedService huespedService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.huespedService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.huespedService.findById(id));
        } catch (HuespedNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Huesped huesped) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(this.huespedService.save(huesped));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar huésped.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Huesped huesped) {
        try {
            return ResponseEntity.ok(this.huespedService.update(id, huesped));
        } catch (HuespedNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.huespedService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (HuespedNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}