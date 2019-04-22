package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Graph {
    @JsonProperty("nodes")
    private List<Node> nodes;
    @JsonProperty("edges")
    private List<Edge> edges;

    public Graph() {
    }

    public Graph(List<Node> nodes, List<Edge> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }

    @Override
    public String toString() {
        return "Graph{" +
                "nodes=" + nodes +
                ", edges=" + edges +
                '}';
    }
}
