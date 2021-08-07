package com.home.assignment.backend.error;

import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(x -> x.getDefaultMessage())
                .collect(Collectors.toList());

        return (new ApiError(errors)).getResponse();

    }

    @ExceptionHandler({TransactionSystemException.class})
    protected ResponseEntity<Object> handlePersistenceException(final Exception ex, final WebRequest request) {

        Throwable cause = ((TransactionSystemException) ex).getRootCause();
        if (cause instanceof ConstraintViolationException) {

            ConstraintViolationException consEx = (ConstraintViolationException) cause;
            List<String> errors = consEx.getConstraintViolations()
                    .stream()
                    .map(x -> x.getMessage())
                    .collect(Collectors.toList());

            return (new ApiError(errors)).getResponse();
        }
        return (new ApiError(ex)).getResponse();
    }

    @ExceptionHandler(RepositoryConstraintViolationException.class)
    public ResponseEntity<?> handleValidationException(RepositoryConstraintViolationException ex, HttpServletRequest request, Locale locale) throws Exception {
        return (new ApiError(ex)).getResponse();
    }

}