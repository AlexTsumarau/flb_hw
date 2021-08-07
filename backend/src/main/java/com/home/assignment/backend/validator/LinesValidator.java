package com.home.assignment.backend.validator;

import com.home.assignment.backend.model.Lines;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class LinesValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return Lines.class.equals(aClass);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        Lines line = (Lines) obj;
        if (checkInputString(line.getDescription())) {
            errors.rejectValue("description", "description.empty");
        }
    }
    private boolean checkInputString(String input) {
        return (input == null || input.trim().length() == 0);
    }

}
