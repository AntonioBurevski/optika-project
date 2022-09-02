package org.graduation.optikaadminapi;

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
                OptikaAdminApiApplication.class
        }
)
@EnableJpaRepositories(
        basePackageClasses = {
                DataModuleBasePackage.class,
                OptikaAdminApiApplication.class
        }
)
@EntityScan(
        basePackageClasses = {
                DataModuleBasePackage.class,
                OptikaAdminApiApplication.class
        }
)
public class OptikaAdminApiApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(OptikaAdminApiApplication.class, args);
    }

}
