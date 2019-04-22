package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LambdaResponse {
    @JsonProperty("graph")
    private Graph graph;
    @JsonProperty("time")
    private double time;

    public LambdaResponse() {
    }

    public LambdaResponse(Graph graph, double time) {
        this.graph = graph;
        this.time = time;
    }

    public Graph getGraph() {
        return graph;
    }

    public void setGraph(Graph graph) {
        this.graph = graph;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "LambdaResponse{" +
                "graph=" + graph +
                ", time='" + time + '\'' +
                '}';
    }
}
