package com.graphs;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.graphs.entity.Edge;
import com.graphs.entity.Graph;
import com.graphs.entity.LambdaResponse;
import com.graphs.entity.Node;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

//@SpringBootApplication
public class GraphsApplication {

    private final static String PAYLOAD = "{\"graph\": {\"nodes\": [{\"nodeId\": 0, \"weight\": 0.2}, {\"nodeId\": 1, \"weight\": 0.3}]," +
            "\"edges\": [{\"nodeId1\": 0, \"nodeId2\": 1, \"weight\": 0.5 }]}," +
            "\"method\": { \"name\": \"simple_grasp\", \"params\": { \"limit\": 0.7} }}";


    public static void main(String[] args) throws IOException {
//        SpringApplication.run(GraphsApplication.class, args);
        BasicAWSCredentials credentials = new
                BasicAWSCredentials("AKIAIDZG46L6WQZKG3MA", "861AaRbwGagxkyLufEB/yOM9yiMbzI95DYeTCqp2");

// (1) Define the AWS Region in which the function is to be invoked
        Regions region = Regions.fromName("us-east-2");

// (2) Instantiate AWSLambdaClientBuilder to build the Lambda client
        AWSLambdaClientBuilder builder = AWSLambdaClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region);

// (3) Build the client, which will ultimately invoke the function
        AWSLambda client = builder.build();

// (4) Create an InvokeRequest with required parameters
        InvokeRequest request = new InvokeRequest()
                .withFunctionName("sasha")
                .withPayload(PAYLOAD);

// (5) Invoke the function and capture response
        InvokeResult result = client.invoke(request);

        ByteBuffer byteBuffer = result.getPayload();

        String rawJson = null;

        try {
            rawJson = StandardCharsets.UTF_8.decode(byteBuffer).toString();
        } catch (Exception e) {

        }

        System.out.println(rawJson);

        JSONObject jsonObject = new JSONObject(rawJson);
        JSONArray nodeArray = jsonObject.getJSONArray("nodes");
        List<Node> nodes = new ArrayList<>();
        for (int i = 0; i < nodeArray.length(); i++) {
            int id = nodeArray.getJSONObject(i).getInt("nodeId");
            double weight = nodeArray.getJSONObject(i).getDouble("weight");
            String color = nodeArray.getJSONObject(i).getString("color");
            nodes.add(new Node(id, weight, color));
        }

        JSONArray edgeArray = jsonObject.getJSONArray("edges");
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < edgeArray.length(); i++) {
            int from = edgeArray.getJSONObject(i).getInt("nodeId1");
            int to = edgeArray.getJSONObject(i).getInt("nodeId2");
            double weight = edgeArray.getJSONObject(i).getDouble("weight");
            String color = edgeArray.getJSONObject(i).getString("color");
            edges.add(new Edge(from, to, weight, color));
        }

        Graph graph = new Graph(nodes, edges);
        double time = jsonObject.getDouble("time");

        LambdaResponse lr = new LambdaResponse(graph, time);
        System.out.println(lr);

//        ObjectMapper mapper = new ObjectMapper();
//        mapper.enableDefaultTyping();
//
//        try {
//            LambdaResponse response = mapper.readValue(rawJson, LambdaResponse.class);
//            System.out.println(response.toString());
//
//        } catch(Exception e) {
//            throw new RuntimeException(e.getMessage(), e);
//        }
    }
}
