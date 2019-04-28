package com.graphs.controller;

import com.graphs.entity.LambdaResponse;
import com.graphs.service.SashaGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CrudController {
    private final SashaGraphService sashaGraphService;

    @Autowired
    public CrudController(SashaGraphService sashaGraphService) {
        this.sashaGraphService = sashaGraphService;
    }

    // Post Mapping
    @PostMapping("/api/sasha/result-graph")
    @ResponseBody
    public LambdaResponse getLambdaResponse(HttpEntity<String> httpEntity) {
        return sashaGraphService.invokeLambdaFunction(httpEntity.getBody());
    }
    @PostMapping("/api/test/result-graph")
    @ResponseBody
    public String greetingJson(HttpEntity<String> httpEntity) {
        System.out.println(httpEntity.getBody());
        return httpEntity.getBody();
    }

    // Get Mapping

    // Put Mapping

    // Update Mapping
}
