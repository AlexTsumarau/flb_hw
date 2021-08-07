package com.home.assignment.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Lines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(min = 7, max = 32)
    private String number;

    @NonNull
    @Size(min = 3, max = 255, message = "Description should contain 3..255 symbols")
    private String description;

    @NonNull
    private Timestamp updated;

    @OneToMany(mappedBy = "line", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Connections> connections;
}
