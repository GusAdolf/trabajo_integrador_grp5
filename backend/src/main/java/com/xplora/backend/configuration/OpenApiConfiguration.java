package com.xplora.backend.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Xplora+ API",
                version = "1.0",
                description = "Esta es una aplicación realizada para el Proyecto Integrador"
        ),
        servers = {
                @Server(
                        description = "Dev Server",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "Prod Server",
                        url = "https://backend-production-147b.up.railway.app"
                )
        }
        /*,
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }*/
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT authentication",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        paramName = HttpHeaders.AUTHORIZATION,
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfiguration {
}
