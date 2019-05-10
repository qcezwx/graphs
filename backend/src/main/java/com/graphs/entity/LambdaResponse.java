package com.graphs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LambdaResponse {
    private Graph graph;
    private double time;
    private double score;
}
