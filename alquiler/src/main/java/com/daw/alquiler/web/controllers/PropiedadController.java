package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Propiedad;
import com.daw.alquiler.services.PropiedadService;
import com.daw.alquiler.services.exceptions.PropiedadNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propiedades")
@CrossOrigin(origins = "*")
public class PropiedadController {

    @Autowired
    private PropiedadService propiedadService;

    // ==========================================
    // RUTAS PÚBLICAS (No necesitan Token)
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Propiedad>> listarTodas() {
        return ResponseEntity.ok(propiedadService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            Propiedad propiedad = propiedadService.findById(id);
            return ResponseEntity.ok(propiedad);
        } catch (PropiedadNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Propiedad>> buscar(@RequestParam(name = "termino") String terminoBusqueda) {
        // Llama a tu método personalizado que busca por título o dirección
        return ResponseEntity.ok(propiedadService.buscarPropiedades(terminoBusqueda));
    }

    // ==========================================
    // RUTAS PRIVADAS (Necesitan Token JWT)
    // ==========================================

    @PostMapping
    public ResponseEntity<?> crearPropiedad(@RequestBody Propiedad propiedad) {
        try {
            Propiedad nuevaPropiedad = propiedadService.save(propiedad);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaPropiedad);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al crear la propiedad\"}");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPropiedad(@PathVariable int id, @RequestBody Propiedad detalles) {
        try {
            // Llama a tu método update que ya se encarga de buscar y setear los datos
            Propiedad propiedadActualizada = propiedadService.update(id, detalles);
            return ResponseEntity.ok(propiedadActualizada);
        } catch (PropiedadNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al actualizar la propiedad\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarPropiedad(@PathVariable int id) {
        try {
            propiedadService.deleteById(id); // Usa tu método deleteById
            return ResponseEntity.ok("{\"mensaje\": \"Propiedad borrada con éxito\"}");
        } catch (PropiedadNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"No se pudo borrar la propiedad\"}");
        }
    }
}