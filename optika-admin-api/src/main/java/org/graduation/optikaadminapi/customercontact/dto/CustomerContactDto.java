package org.graduation.optikaadminapi.customercontact.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomerContactDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String message;

    private LocalDateTime timestamp;

}
