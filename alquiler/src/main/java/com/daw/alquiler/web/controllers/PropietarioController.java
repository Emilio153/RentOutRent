package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Propietario;
import com.daw.alquiler.services.PropiedadService;
import com.daw.alquiler.services.PropietarioService;
import com.daw.alquiler.services.ReservaService;
import com.daw.alquiler.services.exceptions.PropietarioNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/propietarios")
@CrossOrigin(origins = "*")
public class PropietarioController {

    @Autowired
    private PropietarioService propietarioService;
    
    @Autowired 
    private PropiedadService propiedadService;
    
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.propietarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(this.propietarioService.findById(id));
        } catch (PropietarioNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    
 // Devuelve todas las propiedades de un propietario específico
    @GetMapping("/{id}/propiedades")
    public ResponseEntity<?> getPropiedadesByPropietario(@PathVariable int id) {
        try {
            // Reutilizamos tu servicio para comprobar si el propietario existe
            this.propietarioService.findById(id); 
            return ResponseEntity.ok(this.propiedadService.findByPropietario(id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    
 // Devuelve todas las reservas hechas a los alojamientos de este propietario
    @GetMapping("/{id}/reservas")
    public ResponseEntity<?> getReservasByPropietario(@PathVariable int id) {
        try {
            this.propietarioService.findById(id); 
            return ResponseEntity.ok(this.reservaService.findByPropietario(id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Propietario propietario) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(this.propietarioService.save(propietario));
        } catch (Exception ex) {
            // El catch general es útil aquí por si el DNI o Email ya existen en la BD (Unique Constraint)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar propietario. Es posible que el DNI o Email ya estén en uso.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Propietario propietario) {
        try {
            return ResponseEntity.ok(this.propietarioService.update(id, propietario));
        } catch (PropietarioNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            this.propietarioService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (PropietarioNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}