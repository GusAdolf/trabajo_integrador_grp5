package com.xplora.backend.configuration;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Configuración de CORS: Permite orígenes, métodos, headers y credenciales.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",
                "https://frontend-production-bdd1.up.railway.app"
        ));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica la configuración a todas las rutas
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * Configuración principal de seguridad.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Activa CORS con la configuración anterior
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Desactiva CSRF
                .csrf(csrf -> csrf.disable())
                // No guarda estado de sesión
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Reglas de autorización
                .authorizeHttpRequests(auth -> {
                    // Rutas públicas
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    auth.requestMatchers("/api/auth/**", "/h2-console/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/products/**", "/images/**", "/cities/**", "/reviews/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll();

                    // Ejemplo: restringe POST a /products/** y /categories/** a roles ADMIN o SUPERADMIN
                    auth.requestMatchers(HttpMethod.POST, "/products/**", "/categories/**")
                            .hasAnyAuthority("ADMIN","SUPERADMIN");

                    // Rutas que requieren autenticación de usuario logueado
                    auth.requestMatchers("/send-email/**", "/users/profile/**").authenticated();

                    // Todo lo demás requiere autenticación
                    auth.anyRequest().authenticated();
                })
                // Inyecta tu provider y filtro JWT
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // Deshabilita frameOptions para poder usar H2-Console
                .headers(h -> h.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
