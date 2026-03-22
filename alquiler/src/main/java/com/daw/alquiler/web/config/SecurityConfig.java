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
					
					// --- RUTAS PÚBLICAS (No necesitan Token) ---
					// .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
					// .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
					.requestMatchers("/api/auth/**", "/error").permitAll()
					.requestMatchers(HttpMethod.GET, "/api/imagenes").permitAll()
					
					// Dejamos públicos los registros para que la gente pueda crear su cuenta
					.requestMatchers(HttpMethod.POST, "/api/propietarios").permitAll()
					.requestMatchers(HttpMethod.POST, "/api/huespedes").permitAll()
					
					// Dejamos que cualquiera pueda ver las propiedades disponibles
					.requestMatchers(HttpMethod.GET, "/api/propiedades").permitAll()
					.requestMatchers(HttpMethod.GET, "/api/propiedades/buscar").permitAll()
					
					// --- RUTAS PRIVADAS (Necesitan Token JWT) ---
					
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