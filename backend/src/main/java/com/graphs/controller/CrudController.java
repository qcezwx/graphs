package com.graphs.controller;

import com.graphs.entity.Graph;
import com.graphs.entity.LambdaResponse;
import com.graphs.entity.RankingRequest;
import com.graphs.entity.RankingResponseV2;
import com.graphs.entity.RankingResponse;
import com.graphs.service.SashaGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@CrossOrigin(origins = "*")
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
    public LambdaResponse getSashaLambdaResponse(HttpEntity<String> httpEntity) {
        System.out.println(httpEntity.getBody());
        return sashaGraphService.invokeLambdaFunction(httpEntity.getBody());
    }

    @PostMapping("/api/sasha/rankings")
    @ResponseBody
    public RankingResponse getSashaRankings(@RequestBody RankingRequest rankingRequest) {
        System.out.println(rankingRequest);
        return sashaGraphService.getRankings(rankingRequest);
    }

    @PostMapping("/api/sasha/rankingsV2")
    @ResponseBody
    public RankingResponseV2 getSashaRankingsV2(@RequestBody RankingRequest rankingRequest) {
        System.out.println(rankingRequest);
        return sashaGraphService.getRankingsV2(rankingRequest);
    }

    @PostMapping("/api/read-from-file")
    @ResponseBody
    public Graph getGraphFromFile(@RequestParam("graph") MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            return sashaGraphService.getGraphFromInputStream(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
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
