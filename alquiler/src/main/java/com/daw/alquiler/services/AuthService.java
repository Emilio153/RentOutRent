package com.daw.alquiler.services;

import com.daw.alquiler.persistence.repositories.PersonaRepository; // O HuespedRepository
import com.daw.alquiler.services.dto.LoginRequest;
import com.daw.alquiler.services.dto.LoginResponse;
import com.daw.alquiler.services.dto.RefreshDTO;
import com.daw.alquiler.services.dto.RegisterRequest;
import com.daw.alquiler.web.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyectamos BCrypt

    // OJO: Inyecta el repositorio que uses para guardar usuarios
    @Autowired
    private PersonaRepository personaRepository; 

    // ==========================================
    // 1. LÓGICA DE LOGIN
    // ==========================================
    public LoginResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtUtils.generateToken(userDetails);

        return new LoginResponse(token);
    }

 // ==========================================
    // 2. LÓGICA DE REGISTRO
    // ==========================================
    public String register(RegisterRequest request) {
        
        // 1. Validar que las contraseñas coinciden (usando los nombres de tu DTO real)
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        // 2. Comprobar si el email ya existe en la BD
        if (personaRepository.findByEmail(request.getEmail()) != null) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        // 3. Crear la entidad (Usamos la herencia de tu BD)
        // IMPORTANTE: Asegúrate de tener importadas las clases Persona, Propietario y Huesped
        com.daw.alquiler.persistence.entities.Persona nuevoUsuario;
        
        if ("PROPIETARIO".equalsIgnoreCase(request.getTipoUsuario())) {
            nuevoUsuario = new com.daw.alquiler.persistence.entities.Propietario();
        } else {
            // Por defecto, si no manda nada o manda "HUESPED", creamos un huésped
            nuevoUsuario = new com.daw.alquiler.persistence.entities.Huesped();
        }
        
        // Mapeamos todos los campos de tu DTO
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setDni(request.getDni());
        nuevoUsuario.setEmail(request.getEmail());
        nuevoUsuario.setTelefono(request.getTelefono());
        
        // ¡LA MAGIA DE BCRYPT! Encriptamos la contraseña
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));

        // 4. Guardar en la Base de Datos
        personaRepository.save(nuevoUsuario);

        return "Usuario registrado con éxito";
    }
    // ==========================================
    // 3. LÓGICA DE REFRESH TOKEN (Simulada para el MVP)
    // ==========================================
    public LoginResponse refresh(RefreshDTO request) {
        // En un proyecto real, aquí verificarías si el "request.getRefresh()" es válido en la BD.
        // Para que tu app compile y tengas la estructura lista, devolvemos un token simulado.
        
        // return new LoginResponse("nuevo_token_generado");
        throw new UnsupportedOperationException("Refresh Token en construcción para la V2");
    }
}