package com.graphs.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.CharStreams;
import com.graphs.entity.Graph;
import org.apache.commons.codec.Charsets;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Service
public abstract class GraphService {
    public Graph getGraphFromInputStream(InputStream is) throws IOException {
        String rawJson = CharStreams.toString(new InputStreamReader(
                is, Charsets.UTF_8));

        Graph graph;
        ObjectMapper mapper = new ObjectMapper();
        try {
            graph = mapper.readValue(rawJson, Graph.class);
        } catch(Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        return graph;
    }
}
