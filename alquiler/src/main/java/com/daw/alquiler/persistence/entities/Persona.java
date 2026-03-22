package com.daw.alquiler.persistence.entities;

import com.daw.alquiler.persistence.entities.enums.TipoUsuario;
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
@Inheritance(strategy = InheritanceType.JOINED)
@Getter 
@Setter 
@NoArgsConstructor
public class Persona implements UserDetails {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100)
    private String nombre;
    @JsonIgnore
    @Column(length = 20, unique = true)
    private String dni;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String telefono;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUsuario tipoUsuario;
    
    // Guardamos la contraseña en BD, pero NO la mostramos en el JSON
    @Column(nullable = false)
    private String password;

    // =========================================================
    // MÉTODOS DE SPRING SECURITY (UserDetails)
    // =========================================================

    @JsonIgnore 
    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore 
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email; 
    }

    @JsonIgnore 
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore 
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore 
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore 
    @Override
    public boolean isEnabled() {
        return true;
    }
}