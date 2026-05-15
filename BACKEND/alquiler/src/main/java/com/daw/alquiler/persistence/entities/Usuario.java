package com.daw.alquiler.persistence.entities;

import com.daw.alquiler.persistence.entities.enums.Rol;
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
@Table(name = "usuario")
@Getter 
@Setter 
@NoArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100)
    private String nombre;
    
    // 🔥 AQUÍ ESTÁN LOS CAMPOS RECUPERADOS
    @JsonIgnore
    @Column(length = 20, unique = true)
    private String dni;

    @Column(length = 20)
    private String telefono;
    // 🔥 =================================

    @Column(length = 100, unique = true, nullable = false) 
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol; 

    // =========================================================
    // MÉTODOS DE SPRING SECURITY
    // =========================================================

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.rol.name()));
    }

    @Override public String getPassword() { return password; }
    @Override public String getUsername() { return email; }

    @JsonIgnore @Override public boolean isAccountNonExpired() { return true; }
    @JsonIgnore @Override public boolean isAccountNonLocked() { return true; }
    @JsonIgnore @Override public boolean isCredentialsNonExpired() { return true; }
    @JsonIgnore @Override public boolean isEnabled() { return true; }
}