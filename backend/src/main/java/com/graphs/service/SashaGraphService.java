package com.graphs.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.graphs.entity.LambdaResponse;
import com.graphs.handler.LambdaResponseHandler;
import org.springframework.stereotype.Service;

@Service
public class SashaGraphService {
    private final static String PAYLOAD = "{\"graph\": {\"nodes\": [{\"nodeId\": 0, \"weight\": 0.2}, {\"nodeId\": 1, \"weight\": 0.3}]," +
            "\"links\": [{\"nodeId1\": 0, \"nodeId2\": 1, \"weight\": 0.5 }]}," +
            "\"method\": { \"name\": \"simple_grasp\", \"params\": { \"limit\": 0.7} }}";

    public LambdaResponse invokeLambdaFunction(String payload) {
        BasicAWSCredentials credentials =
                new BasicAWSCredentials("AKIAICS2K4P3YXM2IRUA", "sKOFmwGYYpPeaZMYCyHoCxH7zIrKZDQRQ19vYo3A");

        AWSLambdaClientBuilder builder = AWSLambdaClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.fromName("us-east-2"));

        AWSLambda client = builder.build();

        LambdaResponseHandler lambdaHandler = new LambdaResponseHandler();
        InvokeRequest request = new InvokeRequest()
                .withFunctionName("sasha")
                .withPayload(payload);

        InvokeResult result = client.invoke(request);

        return lambdaHandler.parseResponse(result);
    }
}
