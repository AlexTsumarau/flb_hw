package com.home.assignment.backend.projection;

import com.home.assignment.backend.model.Connections;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ConnectionsDto", types = { Connections.class })
public interface ConnectionsDto {
    @Value("#{target.id}")
    long getId();
    String getName();
    int getDistance();
    int getDuration();
    @Value("#{target.getLine().getId()}")
    int getLine();
    @Value("#{target.getLine().getNumber()}")
    String getLineNumber();
}