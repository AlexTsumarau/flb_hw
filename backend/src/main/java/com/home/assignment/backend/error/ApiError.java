package com.home.assignment.backend.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class ApiError {

    Map<String, Object> body = new LinkedHashMap<>();
    HttpStatus status = HttpStatus.BAD_REQUEST;

    public ApiError(List list) {
        body.put("status", status);
        body.put("timestamp", new Date());
        body.put("errors", list);
    }

    public ApiError(Exception e) {
        body.put("status", status);
        body.put("timestamp", new Date());
        body.put("errors", Arrays.asList(e.getLocalizedMessage()));
    }

    public ResponseEntity getResponse() {
        return new ResponseEntity(body, status);
    }
}
