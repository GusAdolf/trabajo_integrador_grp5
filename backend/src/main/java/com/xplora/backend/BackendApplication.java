package com.xplora.backend;

import com.xplora.backend.entity.Role;
import com.xplora.backend.entity.User;
import com.xplora.backend.repository.IUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner init(IUserRepository iUserRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (iUserRepository.findByEmail("admin@admin.com").isEmpty()) {
				User admin = new User();
				admin.setEmail("admin@admin.com");
				admin.setPassword(passwordEncoder.encode("Admin12345678"));
				admin.setFirstname("admin");
				admin.setLastname("admin");
				admin.setRole(Role.SUPERADMIN);
				iUserRepository.save(admin);
			}
		};
	}
}
