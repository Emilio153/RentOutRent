package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Persona;
import com.daw.alquiler.services.PersonaService;
import com.daw.alquiler.services.exceptions.PersonaNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "*")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    // Todas las rutas son PRIVADAS (requieren Token)
    @GetMapping
    public ResponseEntity<List<Persona>> listarTodas() {
        return ResponseEntity.ok(personaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            return ResponseEntity.ok(personaService.findById(id));
        } catch (PersonaNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarPersona(@PathVariable int id) {
        try {
            personaService.deleteById(id);
            return ResponseEntity.ok("{\"mensaje\": \"Persona borrada con éxito\"}");
        } catch (PersonaNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"No se pudo borrar la persona\"}");
        }
    }
}