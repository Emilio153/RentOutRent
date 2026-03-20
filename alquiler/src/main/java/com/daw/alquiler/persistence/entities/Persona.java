package com.daw.alquiler.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "persona")
@Inheritance(strategy = InheritanceType.JOINED) // Estrategia solicitada
@Getter @Setter @NoArgsConstructor
public class Persona implements UserDetails { // <-- Implementamos la interfaz

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100)
    private String nombre;

    @Column(length = 20, unique = true)
    private String dni;

    @Column(length = 100)
    private String email;

    private String password;

    @Column(length = 20)
    private String telefono;

    // ====================================================================
    // MÉTODOS OBLIGATORIOS DE USERDETAILS (SPRING SECURITY)
    // ====================================================================

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Por ahora le damos un rol genérico a todos. 
        // Si más adelante quieres diferenciar, puedes poner lógicas aquí.
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.email; // Usamos tu email como identificador para el Login
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}