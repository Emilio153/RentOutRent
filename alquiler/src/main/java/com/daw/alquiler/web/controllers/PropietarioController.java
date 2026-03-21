package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Propietario;
import com.daw.alquiler.services.PropietarioService;
import com.daw.alquiler.services.exceptions.PropietarioNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propietarios")
@CrossOrigin(origins = "*")
public class PropietarioController {

    @Autowired
    private PropietarioService propietarioService;

    @GetMapping
    public ResponseEntity<List<Propietario>> listarTodos() {
        return ResponseEntity.ok(propietarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            return ResponseEntity.ok(propietarioService.findById(id));
        } catch (PropietarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPropietario(@PathVariable int id, @RequestBody Propietario detalles) {
        try {
            Propietario actualizado = propietarioService.update(id, detalles);
            return ResponseEntity.ok(actualizado);
        } catch (PropietarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Error al actualizar el propietario\"}");
        }
    }

    // Nota: Si quieres implementar las rutas custom "/api/propietarios/{id}/propiedades"
    // necesitarás inyectar el PropiedadService aquí y crear el endpoint correspondiente.
    // De momento, dejamos el CRUD básico para cerrar el backend.
}