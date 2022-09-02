package org.graduation.optikacoreapi.core.error.exception;

import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {

    private String errorCode;

    private String details;

    private String field;

    public BadRequestException(String errorCode, String details) {
        this.errorCode = errorCode;
        this.details = details;
    }

    public BadRequestException(String errorCode, String details, String field) {
        this.errorCode = errorCode;
        this.details = details;
        this.field = field;
    }
}
