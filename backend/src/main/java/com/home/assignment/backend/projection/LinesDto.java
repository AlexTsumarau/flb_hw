package com.home.assignment.backend.projection;

import com.home.assignment.backend.model.Connections;
import com.home.assignment.backend.model.Lines;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "LinesDto", types = { Lines.class })
public interface LinesDto {
    @Value("#{target.id}")
    long getId();
    String getNumber();
    String getDescription();
}