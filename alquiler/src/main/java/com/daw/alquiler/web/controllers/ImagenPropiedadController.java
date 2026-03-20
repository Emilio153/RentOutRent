package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.ImagenPropiedad;
import com.daw.alquiler.services.ImagenPropiedadService;
import com.daw.alquiler.services.exceptions.ImagenPropiedadNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/imagenes")
@CrossOrigin(origins = "*")
public class ImagenPropiedadController {

    @Autowired
    private ImagenPropiedadService imagenService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.imagenService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.imagenService.findById(id));
        } catch (ImagenPropiedadNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ImagenPropiedad imagen) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(this.imagenService.save(imagen));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al guardar la imagen");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.imagenService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (ImagenPropiedadNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}