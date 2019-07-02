package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankingRequest {
    private int nodesNumber;
    private double nodeMinWeight;
    private double nodeMaxWeight;
    private double linkMinWeight;
    private double linkMaxWeight;

    private Method method;
}
