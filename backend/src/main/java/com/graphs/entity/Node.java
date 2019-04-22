package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Node {
    @JsonProperty("nodeId")
    private int id;
    @JsonProperty("weight")
    private double weight;
    @JsonProperty("color")
    private String color;

    public Node() {
    }

    public Node(int id, double weight, String color) {
        this.id = id;
        this.weight = weight;
        this.color = color;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
        return "Node{" +
                "id='" + id + '\'' +
                ", weight=" + weight +
                ", color='" + color + '\'' +
                '}';
    }
}
