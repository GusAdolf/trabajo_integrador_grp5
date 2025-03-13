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
                    //auth.anyRequest().permitAll();
                    // endpoints que no requieren autenticacion
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    auth.requestMatchers("/api/auth/**").permitAll();
                    auth.requestMatchers("/h2-console/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/products/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/cities/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/images/**").permitAll();
                    // endpoints de swagger
                    auth.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll();
                    // endopoint que requieren roles especificos
                    auth.requestMatchers(HttpMethod.POST, "/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/products/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/images/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/cities/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers("/users").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    //auth.requestMatchers("/users/*/role/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    // protección para categorías
                    auth.requestMatchers(HttpMethod.GET, "/categories/**").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/categories/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    // features
                    auth.requestMatchers(HttpMethod.GET, "/features/product/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/features").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/features/**").hasAnyAuthority("ADMIN", "SUPERADMIN");
                    //auth.requestMatchers("/users/**").hasAuthority("ADMIN");
                    // endpoints que requieren autenticacion (al menos el rol de usuario)
                    auth.requestMatchers( "/send-email/**").authenticated();
                    auth.requestMatchers( "/users/profile/**").authenticated();
                    auth.anyRequest().authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)) // solucion a h2-console
                .build();
    }
}