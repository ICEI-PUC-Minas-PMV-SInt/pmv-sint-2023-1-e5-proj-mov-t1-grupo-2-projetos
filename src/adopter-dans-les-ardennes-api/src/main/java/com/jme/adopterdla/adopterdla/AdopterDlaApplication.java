package com.jme.adopterdla.adopterdla;

import com.microsoft.applicationinsights.attach.ApplicationInsights;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

@SpringBootApplication
@EnableR2dbcAuditing
@EnableR2dbcRepositories
public class AdopterDlaApplication {

	public static void main(String[] args) {
		ApplicationInsights.attach();
		SpringApplication.run(AdopterDlaApplication.class, args);
	}

}
