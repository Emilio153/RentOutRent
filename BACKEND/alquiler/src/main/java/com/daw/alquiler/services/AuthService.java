package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Usuario;
import com.daw.alquiler.persistence.entities.enums.Rol;
import com.daw.alquiler.persistence.repositories.UsuarioRepository;
import com.daw.alquiler.services.dto.LoginRequest;
import com.daw.alquiler.services.dto.LoginResponse;
import com.daw.alquiler.services.dto.RefreshDTO;
import com.daw.alquiler.services.dto.RegisterRequest;
import com.daw.alquiler.services.exceptions.AuthException;
import com.daw.alquiler.web.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    // 🔥 Usamos tu nuevo repositorio limpio
    @Autowired
    private UsuarioRepository usuarioRepository; 

    // ==========================================
    // 1. LÓGICA DE LOGIN 
    // ==========================================
    public LoginResponse login(LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            
            // Buscamos al usuario en la BD (Ahora es de tipo Usuario)
            Usuario usuario = usuarioRepository.findByEmail(request.getEmail());
            
            // Creamos la "mochila" y le metemos el ID y su Rol
            Map<String, Object> claimsExtras = new HashMap<>();
            if (usuario != null) {
                claimsExtras.put("id", usuario.getId());
                claimsExtras.put("rol", usuario.getRol().name()); // Opcional, pero muy útil para Angular
            }

            // Generamos el token
            String token = jwtUtils.generateToken(claimsExtras, userDetails);

            return new LoginResponse(token);

        } catch (AuthenticationException e) {
            throw new AuthException("Credenciales incorrectas o usuario no encontrado");
        }
    }

    // ==========================================
    // 2. LÓGICA DE REGISTRO
    // ==========================================
    public String register(RegisterRequest request) {
        
        // 1. Validar contraseñas
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        // 2. Comprobar si el email ya existe
        if (usuarioRepository.findByEmail(request.getEmail()) != null) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        // 3. Crear SIEMPRE un Usuario (¡Adiós herencia!)
        Usuario nuevoUsuario = new Usuario();
        
        // 4. Asignamos el Rol según lo que pida el Frontend
        // Si el frontend manda "PROPIETARIO" o "USUARIO", le damos el rol completo.
        if ("PROPIETARIO".equalsIgnoreCase(request.getTipoUsuario()) || "USUARIO".equalsIgnoreCase(request.getTipoUsuario())) {
            nuevoUsuario.setRol(Rol.USUARIO);
        } else {
            // Por defecto, cuenta básica que solo puede ver y reservar
            nuevoUsuario.setRol(Rol.PERSONA); 
        }
        
        // 5. Mapeamos los datos
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setDni(request.getDni());
        nuevoUsuario.setEmail(request.getEmail());
        nuevoUsuario.setTelefono(request.getTelefono());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // 6. Guardamos
        usuarioRepository.save(nuevoUsuario);

        return "Usuario registrado con éxito";
    }

    // ==========================================
    // 3. LÓGICA DE REFRESH TOKEN 
    // ==========================================
    public LoginResponse refresh(RefreshDTO request) {
        throw new UnsupportedOperationException("Refresh Token en construcción para la V2");
    }

    // ==========================================
    // 4. LÓGICA DE ASCENSO A USUARIO COMPLETO
    // ==========================================
    // Mantenemos el nombre del método por si tu Angular o tu AuthController lo llaman así
    public LoginResponse ascenderAPropietario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        
        if (usuario == null) {
            throw new IllegalArgumentException("Usuario no encontrado con el email: " + email);
        }

        // Le subimos de nivel cambiándole la etiqueta del Enum
        usuario.setRol(Rol.USUARIO);
        usuarioRepository.save(usuario);

        // Generamos un nuevo token que ahora tendrá los permisos ampliados
        Map<String, Object> claimsExtras = new HashMap<>();
        claimsExtras.put("id", usuario.getId());
        claimsExtras.put("rol", usuario.getRol().name());

        String nuevoToken = jwtUtils.generateToken(claimsExtras, (UserDetails) usuario);

        return new LoginResponse(nuevoToken);
    }
}