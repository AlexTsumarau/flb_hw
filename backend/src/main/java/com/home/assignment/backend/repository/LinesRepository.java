package com.home.assignment.backend.repository;

import com.home.assignment.backend.model.Lines;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "lines", path = "lines")
@Validated
@CrossOrigin(allowCredentials = "false")
public interface LinesRepository extends PagingAndSortingRepository<Lines, Long>{

    List<Lines> description(@Param("description") String description);

    List<Lines> findByDescriptionContaining(String description, Pageable pageable);

    void save(List entity);

    void deleteById(Long id);
}
