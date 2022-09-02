package org.graduation.optikacoreapi;

import org.graduation.data.DataModuleBasePackage;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(
        basePackageClasses = {
                DataModuleBasePackage.class,
                OptikaCoreApiApplication.class
        }
)
@EnableJpaRepositories(
        basePackageClasses = {
                DataModuleBasePackage.class,
                OptikaCoreApiApplication.class
        }
)
@EntityScan(
        basePackageClasses = {
                DataModuleBasePackage.class,
                OptikaCoreApiApplication.class
        }
)
public class OptikaCoreApiApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(OptikaCoreApiApplication.class, args);
    }

}
