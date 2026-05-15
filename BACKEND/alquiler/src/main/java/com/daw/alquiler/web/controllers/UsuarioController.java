package com.daw.alquiler.web.controllers;

import com.daw.alquiler.persistence.entities.Usuario;
import com.daw.alquiler.services.UsuarioService;
// Asumimos que tienes estos servicios creados en tu proyecto
import com.daw.alquiler.services.PropiedadService; 
import com.daw.alquiler.services.ReservaService;
import com.daw.alquiler.services.exceptions.UsuarioNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // 🔥 Inyectamos los otros servicios para poder buscar sus datos
    @Autowired
    private PropiedadService propiedadService;

    @Autowired
    private ReservaService reservaService;

    // ==========================================
    // 1. RUTAS BÁSICAS DEL USUARIO
    // ==========================================
    
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
        try {
            return ResponseEntity.ok(usuarioService.findById(id));
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarUsuario(@PathVariable int id) {
        try {
            usuarioService.deleteById(id);
            return ResponseEntity.ok("{\"mensaje\": \"Usuario borrado con éxito\"}");
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"No se pudo borrar el usuario\"}");
        }
    }

    // ==========================================
    // 2. RUTAS PERSONALIZADAS (Para Angular)
    // ==========================================

    // 🔥 Endpoint para "Mis Propiedades"
    @GetMapping("/{id}/propiedades")
    public ResponseEntity<?> obtenerMisPropiedades(@PathVariable int id) {
        try {
            // Comprobamos que el usuario existe primero
            usuarioService.findById(id); 
            // Buscamos las propiedades donde el usuario_id coincida
            return ResponseEntity.ok(propiedadService.findByUsuarioId(id)); 
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Usuario no encontrado\"}");
        }
    }

    // 🔥 Endpoint para "Mis Reservas Realizadas" (Cuando actúo como huésped)
    @GetMapping("/{id}/reservas")
    public ResponseEntity<?> obtenerMisReservasRealizadas(@PathVariable int id) {
        try {
            usuarioService.findById(id);
            // Buscamos reservas donde el huesped_id sea mi ID
            return ResponseEntity.ok(reservaService.findByHuespedId(id)); 
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Usuario no encontrado\"}");
        }
    }

    // 🔥 Endpoint para "Mis Reservas Recibidas" (Cuando actúo como anfitrión)
    @GetMapping("/{id}/reservas/recibidas")
    public ResponseEntity<?> obtenerMisReservasRecibidas(@PathVariable int id) {
        try {
            usuarioService.findById(id);
            // Buscamos reservas asociadas a las casas de las que soy dueño
            return ResponseEntity.ok(reservaService.findReservasRecibidasByUsuarioId(id)); 
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Usuario no encontrado\"}");
        }
    }
 // ==========================================
    // 3. RUTAS DE FAVORITOS
    // ==========================================
    @GetMapping("/{id}/favoritos")
    public ResponseEntity<?> getFavoritos(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.getFavoritos(id));
    }

    @PostMapping("/{id}/favoritos/{propiedadId}")
    public ResponseEntity<?> addFavorito(@PathVariable int id, @PathVariable int propiedadId) {
        usuarioService.addFavorito(id, propiedadId);
        return ResponseEntity.ok("{\"mensaje\": \"Añadido a favoritos\"}");
    }

    @DeleteMapping("/{id}/favoritos/{propiedadId}")
    public ResponseEntity<?> removeFavorito(@PathVariable int id, @PathVariable int propiedadId) {
        usuarioService.removeFavorito(id, propiedadId);
        return ResponseEntity.ok("{\"mensaje\": \"Eliminado de favoritos\"}");
    }
}