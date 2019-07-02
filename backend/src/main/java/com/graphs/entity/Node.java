package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Node {
    @JsonProperty("nodeId")
    private int id;
    private double weight;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String color;
}
