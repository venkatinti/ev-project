package com.evproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EvAnalyticsBackend1Application {

	public static void main(String[] args) {
		SpringApplication.run(EvAnalyticsBackend1Application.class, args);
	}

}
