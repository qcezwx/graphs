package com.graphs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankingResponse {
    private double minTime;
    private double maxTime;
    private double averageTime;
    private double minScore;
    private double maxScore;
    private double averageScore;
}
