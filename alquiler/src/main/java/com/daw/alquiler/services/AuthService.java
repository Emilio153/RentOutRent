package com.daw.alquiler.services;

import com.daw.alquiler.services.dto.LoginRequest;
import com.daw.alquiler.services.dto.LoginResponse;
import com.daw.alquiler.web.config.JwtUtils; // Asegúrate de renombrar tu JwtService a JwtUtils

import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Getter
@Setter

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public LoginResponse login(LoginRequest request) {
        // 1. Spring Security comprueba si el email y la contraseña coinciden en la BD
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. Si es correcto, generamos el JWT
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtUtils.generateToken(userDetails); // Tu método generateToken

        // 3. Devolvemos el DTO con el token
        return new LoginResponse(token);
    }
}