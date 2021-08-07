package com.home.assignment.backend;

import com.home.assignment.backend.model.Lines;
import com.home.assignment.backend.repository.LinesRepository;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.rules.ExpectedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolationException;

import static org.junit.Assert.*;
import java.util.Optional;

@SpringBootTest(classes = BackendApplication.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @Autowired
    private LinesRepository linesRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    public void saveTest() {
        Lines line = new Lines();
        line.setNumber("FLX0001T");
        line.setDescription("Descr FLX0001T");
        linesRepository.save(line);

        Optional<Lines> fetchedLine = linesRepository.findById(2L);
        assertEquals("FLX0001T", fetchedLine.get().getNumber().toString());
    }

    @Rule
    public final ExpectedException thrown = ExpectedException.none();

    @Test
    public void validationTest() {
        Lines line = new Lines();
        line.setNumber("FLX0001T");
        line.setDescription("");
        //thrown.expect(ConstraintViolationException.class);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            linesRepository.save(line);
        });
    }
}
