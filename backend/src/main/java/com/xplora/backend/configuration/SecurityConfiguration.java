package com.xplora.backend.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(
                        auth -> {
                            // Permitir opciones y endpoints de autenticación
                            auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                            auth.requestMatchers("/api/v1/auth/**").permitAll();
                            auth.requestMatchers("/h2-console/**").permitAll();

                            // Swagger (Documentación)
                            auth.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll();

                            // Endpoints de productos, imágenes, ciudades, etc.
                            auth.requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll();
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.PUT, "/api/v1/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/v1/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/images/**").permitAll();
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/images/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            auth.requestMatchers("/api/v1/users").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers("/api/v1/users/*/role/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/cities/**").permitAll();
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/cities/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/availabilities/product/**").permitAll();

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/reviews/product/**").permitAll();

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll();
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/categories/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/v1/categories/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            auth.requestMatchers(HttpMethod.GET, "/api/v1/features/product/**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/v1/features").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.PUT, "/api/v1/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/v1/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");

                            // <---- Permitir el acceso a enviar email de confirmación de reserva
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/send-email/booking").permitAll();

                            // Todos los demás endpoints requieren autenticación
                            auth.anyRequest().authenticated();
                        })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)) // Solución para h2-console
                .build();
    }
}
