package com.home.assignment.backend.repository;

import com.home.assignment.backend.model.Connections;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "connections", path = "connections")
@CrossOrigin(allowCredentials = "false")
public interface ConnectionsRepository extends PagingAndSortingRepository<Connections, Long> {

    List<Connections> name(@Param("name") String name);

    List<Connections> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Connections> findByNameContainingIgnoreCaseAndLineId(String name, Long line, Pageable pageable);

    List<Connections> findByNameContainingIgnoreCaseAndLineNumber(String name, String number, Pageable pageable);

    List<Connections> findByLineId(Long line, Pageable pageable);

    List<Connections> findByLineNumber(String number, Pageable pageable);
}
