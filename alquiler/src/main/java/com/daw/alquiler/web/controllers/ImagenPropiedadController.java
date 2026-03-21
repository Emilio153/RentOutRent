package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.ImagenPropiedad;
import com.daw.alquiler.services.ImagenPropiedadService;
import com.daw.alquiler.services.exceptions.ImagenPropiedadNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imagenes")
@CrossOrigin(origins = "*") // Vital para que Angular pueda pedir las fotos sin bloqueos de CORS
public class ImagenPropiedadController {

    @Autowired
    private ImagenPropiedadService imagenService;

    // ==========================================
    // RUTAS PÚBLICAS (No necesitan Token)
    // ==========================================

    @GetMapping
    public ResponseEntity<List<ImagenPropiedad>> listarImagenes() {
        return ResponseEntity.ok(imagenService.findAll());
    }

    // ==========================================
    // RUTAS PRIVADAS (Necesitan Token JWT)
    // ==========================================

    @PostMapping
    public ResponseEntity<?> añadirImagen(@RequestBody ImagenPropiedad imagen) {
        try {
            ImagenPropiedad nuevaImagen = imagenService.save(imagen);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaImagen);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al guardar la imagen: " + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarImagen(@PathVariable int id) {
        try {
            imagenService.deleteById(id);
            return ResponseEntity.ok("{\"mensaje\": \"Imagen borrada con éxito\"}");
        } catch (ImagenPropiedadNotFoundException e) {
            // Aquí atrapamos tu excepción personalizada perfectamente
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"No se pudo borrar la imagen\"}");
        }
    }
}