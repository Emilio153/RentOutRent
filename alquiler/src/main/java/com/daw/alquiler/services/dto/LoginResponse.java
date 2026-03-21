package com.daw.alquiler.services.dto;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class LoginResponse {
    
    private String token;

    // CONSTRUCTOR OBLIGATORIO PARA QUE EL ERROR DESAPAREZCA
    public LoginResponse(String token) {
        this.token = token;
    }
}