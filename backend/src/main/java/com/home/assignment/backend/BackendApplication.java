package com.home.assignment.backend;

import com.home.assignment.backend.validator.LinesValidator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@SpringBootApplication
public class BackendApplication implements RepositoryRestConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener v) {
		v.addValidator("beforeSave", new LinesValidator());
	}
}
