package com.graphs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RankingResponseV2 {
    List<Double> timeRanking;
    List<Double> scoreRanking;
}