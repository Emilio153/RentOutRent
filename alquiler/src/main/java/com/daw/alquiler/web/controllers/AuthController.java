package com.daw.alquiler.web.controllers;

import com.daw.alquiler.services.AuthService;
import com.daw.alquiler.services.dto.LoginRequest;
import com.daw.alquiler.services.dto.LoginResponse;
import com.daw.alquiler.services.dto.RefreshDTO;
import com.daw.alquiler.services.dto.RegisterRequest;
import com.daw.alquiler.services.exceptions.AuthException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite peticiones desde tu Angular
public class AuthController {

    @Autowired
    private AuthService authService;

    // 1. ENDPOINT DE LOGIN
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Mira qué limpio queda sin el try-catch
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // 2. ENDPOINT DE REGISTRO
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String mensaje = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"mensaje\": \"" + mensaje + "\"}");
        } catch (IllegalArgumentException e) {
            // Si las contraseñas no coinciden o el email ya existe
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // 3. ENDPOINT DE REFRESH TOKEN (Preparado para el futuro)
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshDTO request) {
        // Por ahora devolvemos un mensaje o un token simulado para tu MVP
        LoginResponse response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }
    
 // Este método atrapa el error de credenciales y evita el 403
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<?> handleAuthException(AuthException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("{\"error\": \"" + e.getMessage() + "\"}");
    }
}