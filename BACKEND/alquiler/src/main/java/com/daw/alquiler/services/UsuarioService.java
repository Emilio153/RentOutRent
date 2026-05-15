package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Propiedad;
import com.daw.alquiler.persistence.entities.Usuario;
import com.daw.alquiler.persistence.repositories.UsuarioRepository;
// OJO: Si tenías PersonaNotFoundException, cámbiale el nombre a UsuarioNotFoundException en tu proyecto
import com.daw.alquiler.services.exceptions.UsuarioNotFoundException; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private com.daw.alquiler.persistence.repositories.PropiedadRepository propiedadRepository;
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(int id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException("No se encontró el usuario con ID: " + id));
    }
    
    // Este método lo mantengo porque lo tenías, aunque recuerda que el login
    // principal y seguro (con BCrypt y JWT) ya lo hace tu AuthService.
    public Usuario login(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null || !usuario.getPassword().equals(password)) {
            throw new RuntimeException("Credenciales inválidas");
        }
        return usuario;
    }

    public void deleteById(int id) {
        if (!usuarioRepository.existsById(id)) {
            throw new UsuarioNotFoundException("No se puede eliminar. Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    // ====================================================================
    // MÉTODO OBLIGATORIO DE USERDETAILSSERVICE (Para Spring Security)
    // ====================================================================
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // En nuestro caso, el 'username' de Spring Security es el email
        Usuario usuario = usuarioRepository.findByEmail(username);
        
        if (usuario == null) {
            throw new UsernameNotFoundException("El usuario con email " + username + " no existe.");
        }
        
        // Devolvemos la entidad Usuario (que ya implementa UserDetails)
        return usuario; 
    }

    // --- MÉTODOS DE FAVORITOS ---
    public List<Propiedad> getFavoritos(int usuarioId) {
        return findById(usuarioId).getFavoritos();
    }

    public void addFavorito(int usuarioId, int propiedadId) {
        Usuario u = findById(usuarioId);
        Propiedad p = propiedadRepository.findById(propiedadId).orElseThrow();
        if (!u.getFavoritos().contains(p)) {
            u.getFavoritos().add(p);
            usuarioRepository.save(u);
        }
    }

    public void removeFavorito(int usuarioId, int propiedadId) {
        Usuario u = findById(usuarioId);
        u.getFavoritos().removeIf(p -> p.getId() == propiedadId);
        usuarioRepository.save(u);
    }
}