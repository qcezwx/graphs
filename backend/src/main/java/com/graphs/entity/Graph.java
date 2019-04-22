package com.graphs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Graph {
    private List<Node> nodes;
    private List<Edge> edges;
}
