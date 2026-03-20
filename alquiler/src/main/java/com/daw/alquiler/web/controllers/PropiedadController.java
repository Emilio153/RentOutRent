package com.daw.alquiler.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.alquiler.persistence.entities.Propiedad;
import com.daw.alquiler.persistence.repositories.PropiedadRepository;
import com.daw.alquiler.services.PropiedadService;

@RestController
@RequestMapping("/propiedades")
@CrossOrigin(origins = "*") // Importante para que tu Angular pueda conectarse sin líos de CORS
public class PropiedadController {

    @Autowired
    private PropiedadRepository propiedadRepository;
    
    @Autowired
    private PropiedadService propiedadService;

    // Listar todas
    @GetMapping
    public List<Propiedad> listarPropiedades() {
        return propiedadRepository.findAll();
    }

    // Crear una propiedad
    @PostMapping
    public ResponseEntity<Propiedad> crearPropiedad(@RequestBody Propiedad propiedad) {
        // OJO: En un MVP real, aquí validarías que venga el Propietario ID
        Propiedad nueva = propiedadRepository.save(propiedad);
        return ResponseEntity.ok(nueva);
    }
    
    // Extra: Obtener por ID (te será muy útil para el detalle)
    @GetMapping("/{id}")
    public ResponseEntity<Propiedad> obtenerPropiedad(@PathVariable int id) {
        return propiedadRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
 // Endpoint: GET /api/propiedades/buscar?termino=Madrid
    @GetMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestParam String termino) {
        try {
            List<Propiedad> resultados = this.propiedadService.buscarPropiedades(termino);
            if (resultados.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron propiedades para: " + termino);
            }
            return ResponseEntity.ok(resultados);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al realizar la búsqueda");
        }
    }
}