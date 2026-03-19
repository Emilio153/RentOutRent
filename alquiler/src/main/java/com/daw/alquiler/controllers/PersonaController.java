package com.daw.alquiler.controllers;

import com.daw.alquiler.persistence.entities.Persona;
import com.daw.alquiler.services.PersonaService;
import com.daw.alquiler.services.exceptions.PersonaNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "*")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.personaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.personaService.findById(id));
        } catch (PersonaNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Persona credenciales) {
        try {
            Persona personaLogueada = this.personaService.login(credenciales.getEmail(), credenciales.getPassword());
            return ResponseEntity.ok(personaLogueada);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.personaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (PersonaNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}