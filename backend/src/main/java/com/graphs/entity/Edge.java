package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Edge {
    @JsonProperty("nodeId1")
    private int from;
    @JsonProperty("nodeId2")
    private int to;
    @JsonProperty("weight")
    private double weight;
    @JsonProperty("color")
    private String color;

    public Edge() {
    }

    public Edge(int from, int to, double weight, String color) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.color = color;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "Edge{" +
                "from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", weight=" + weight +
                ", color='" + color + '\'' +
                '}';
    }
}
