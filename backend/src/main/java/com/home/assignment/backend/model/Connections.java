package com.home.assignment.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Connections {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique=true, nullable=false)
    private Long id;

    @NonNull
    @Size(min = 5, max = 32)
    private String name;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "line_id", nullable = false)
    private Lines line;

    @NonNull
    @Size(min = 0, max = 3600)
    private Integer duration;

    @NonNull
    @Size(min = 0, max = 40000)
    private Integer distance;

    @NonNull
    private String updated;
}
