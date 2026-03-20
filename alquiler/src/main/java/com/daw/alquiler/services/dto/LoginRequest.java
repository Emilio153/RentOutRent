package com.daw.alquiler.services.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {
    private String email; // En tu app usamos email en lugar de username
    private String password;
}