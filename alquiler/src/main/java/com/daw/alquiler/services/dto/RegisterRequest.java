package com.daw.alquiler.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequest {
    
    private String nombre;
    private String dni;
    private String email;
    private String telefono;
    
    private String password;
    private String confirmPassword; // El equivalente a tu password2
    
    // Un extra muy útil: saber si se está registrando un dueño o un cliente
    private String tipoUsuario; // Puede ser "PROPIETARIO" o "HUESPED"
}