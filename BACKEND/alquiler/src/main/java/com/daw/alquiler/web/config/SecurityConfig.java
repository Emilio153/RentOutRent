package com.daw.alquiler.web.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(auth -> auth
			
				    // ==========================================
				    // 🌍 RUTAS 100% PÚBLICAS (No necesitan Token en Postman)
				    // ==========================================
				    .requestMatchers("/api/auth/**", "/error").permitAll()
				    // 🔥 CORRECCIÓN: Ahora el catálogo sí es público para todo el mundo
				    .requestMatchers(HttpMethod.GET, "/api/propiedades", "/api/propiedades/**", "/api/propiedades/buscar").permitAll()
				    .requestMatchers(HttpMethod.GET, "/api/imagenes", "/api/imagenes/**").permitAll()
				    
				    // ==========================================
				    // 🚫 RUTAS PROHIBIDAS
				    // ==========================================
				    // 🔥 CORRECCIÓN: NADIE puede ver la lista de todos los usuarios
				    .requestMatchers(HttpMethod.GET, "/api/usuarios").denyAll()

				    // ==========================================
				    // 🔒 RUTAS PRIVADAS GENERALES (Cualquier logueado: PERSONA o USUARIO)
				    // ==========================================
				    // Ver detalle de tu propio usuario, tus reservas y propiedades
				    .requestMatchers(HttpMethod.GET, "/api/usuarios/{id}/**").authenticated()
				    // Crear reservas o verlas
				    .requestMatchers("/api/reservas", "/api/reservas/**").authenticated()
				    // Enviar y leer mensajes
				    .requestMatchers("/api/mensajes", "/api/mensajes/**").authenticated()

				    // ==========================================
				    // 👑 RUTAS DE ANFITRIÓN (Solo rol USUARIO)
				    // ==========================================
				    // Solo el USUARIO puede crear, editar o borrar casas
				    .requestMatchers(HttpMethod.POST, "/api/propiedades").hasRole("USUARIO")
				    .requestMatchers(HttpMethod.PUT, "/api/propiedades/**").hasRole("USUARIO")
				    .requestMatchers(HttpMethod.DELETE, "/api/propiedades/**").hasRole("USUARIO")
				    
				    // Solo el USUARIO puede añadir o borrar imágenes
				    .requestMatchers(HttpMethod.POST, "/api/imagenes").hasRole("USUARIO")
				    .requestMatchers(HttpMethod.DELETE, "/api/imagenes/**").hasRole("USUARIO")
				    
				    .anyRequest().authenticated()
				)
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
			
		return http.build();
	}
	
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Damos permiso explícito a nuestro Frontend en Angular
        List<String> allowedOrigins = Arrays.asList("http://localhost:4200");
        configuration.setAllowedOrigins(allowedOrigins);
        
        // Métodos permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Cabeceras permitidas (imprescindible para el Token)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }	

}