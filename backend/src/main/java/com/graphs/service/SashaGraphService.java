package com.graphs.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graphs.entity.*;
import com.graphs.handler.LambdaResponseHandler;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class SashaGraphService extends GraphService{
    private final static String PAYLOAD = "{\"graph\": {\"nodes\": [{\"nodeId\": 0, \"weight\": 0.2}, {\"nodeId\": 1, \"weight\": 0.3}]," +
            "\"links\": [{\"nodeId1\": 0, \"nodeId2\": 1, \"weight\": 0.5 }]}," +
            "\"method\": { \"name\": \"simple_grasp\", \"params\": { \"limit\": 0.7} }}";

    public LambdaResponse invokeLambdaFunction(String payload) {
        InvokeResult result = getInvokeResult(payload);

        LambdaResponseHandler lambdaHandler = new LambdaResponseHandler();

        return lambdaHandler.parseResponse(result);
    }

    private InvokeResult getInvokeResult(String payload) {
        BasicAWSCredentials credentials =

        AWSLambdaClientBuilder builder = AWSLambdaClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.fromName("us-east-2"));

        AWSLambda client = builder.build();

        InvokeRequest request = new InvokeRequest()
                .withFunctionName("sasha")
                .withPayload(payload);

        return client.invoke(request);
    }

    public RankingResponseV2 getRankingsV2(RankingRequest rankingRequest) {
        List<LambdaResponse> lambdaResponses = new ArrayList<>();
        for (int i = 0; i < rankingRequest.getMethod().getParameters().getIterations(); i++) {
            String payload = generateRandomPayload(rankingRequest);
            System.out.println(payload);
            lambdaResponses.add(invokeLambdaFunction(payload));
        }

        List<Double> times = lambdaResponses.stream().map(LambdaResponse::getTime).collect(Collectors.toList());
        List<Double> scores = lambdaResponses.stream().map(LambdaResponse::getScore).collect(Collectors.toList());

        RankingResponseV2 rankingResponseV2 = new RankingResponseV2(times, scores);
        System.out.println(rankingResponseV2);
        return rankingResponseV2;
    }

    public RankingResponse getRankings(RankingRequest rankingRequest) {
        List<LambdaResponse> lambdaResponses = new ArrayList<>();
        for (int i = 0; i < rankingRequest.getMethod().getParameters().getIterations(); i++) {
            String payload = generateRandomPayload(rankingRequest);
            System.out.println(payload);
            lambdaResponses.add(invokeLambdaFunction(payload));
        }

        List<Double> times = lambdaResponses.stream().map(LambdaResponse::getTime).collect(Collectors.toList());
        List<Double> scores = lambdaResponses.stream().map(LambdaResponse::getScore).collect(Collectors.toList());

        double minTime = times.stream().min(Double::compareTo).get();
        double maxTime = times.stream().max(Double::compareTo).get();
        double minScore = scores.stream().min(Double::compareTo).get();
        double maxScore = scores.stream().max(Double::compareTo).get();

        double sumTime = 0;
        for (double t: times) {
            sumTime+=t;
        }
        double averageTime = sumTime / times.size();

        double sumScore = 0;
        for (double s: scores) {
            sumScore+=s;
        }
        double averageScore = sumScore / scores.size();

        return new RankingResponse(minTime, maxTime, averageTime, minScore, maxScore, averageScore);
    }

    private String generateRandomPayload(RankingRequest rankingRequest) {
        int nodesNumber = rankingRequest.getNodesNumber();
        List<Double> doubles = new Random()
                .doubles(nodesNumber, rankingRequest.getNodeMinWeight(), rankingRequest.getNodeMaxWeight())
                .boxed().collect(Collectors.toList());

        List<Node> nodes = new ArrayList<>();
        for (int i = 0; i < doubles.size(); i++) {
            Node node = new Node();
            node.setId(i);
            node.setWeight(Math.round(doubles.get(i)));
            nodes.add(node);
        }

        List<Double> doubles1 = new Random()
                .doubles((nodesNumber * (nodesNumber - 1) / 2), rankingRequest.getLinkMinWeight(), rankingRequest.getLinkMaxWeight())
                .boxed().collect(Collectors.toList());

        int linkCounter = 0;
        List<Link> links = new ArrayList<>();
        for (int i = 0; i < nodes.size(); i++) {
            for (int j = i + 1; j < nodes.size(); j++) {
                Link link = new Link();
                link.setFrom(i);
                link.setTo(j);
                link.setWeight(Math.round(doubles1.get(linkCounter++)));
                links.add(link);
            }
        }

        Graph graph = new Graph(nodes, links);
        int limit = rankingRequest.getMethod().getParameters().getLimit();
        Parameters parameters = new Parameters();
        parameters.setLimit(limit);
        LambdaRequest lambdaRequest = new LambdaRequest(graph,
                new Method(rankingRequest.getMethod().getName(), parameters));

        ObjectMapper mapper = new ObjectMapper();
        String payload;
        try {
            payload = mapper.writeValueAsString(lambdaRequest);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        return payload;
    }
}
