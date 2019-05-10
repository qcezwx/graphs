package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Link {
    @JsonProperty("nodeId1")
    private int from;
    @JsonProperty("nodeId2")
    private int to;
    private double weight;
    private String color;
}
