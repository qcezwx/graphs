package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double weight;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String color;
}
