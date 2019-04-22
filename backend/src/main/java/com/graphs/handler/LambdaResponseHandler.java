package com.graphs.handler;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graphs.entity.Graph;
import com.graphs.entity.LambdaResponse;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class LambdaResponseHandler {
    public LambdaResponse parseResponse(InvokeResult result) {
        ByteBuffer byteBuffer = result.getPayload();

        String rawJson;

        try {
            rawJson = StandardCharsets.UTF_8.decode(byteBuffer).toString().replaceFirst("^\"(?<json>.*)\"$", "${json}").replaceAll("\\\\", "");
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        ObjectMapper mapper = new ObjectMapper();

        LambdaResponse lambdaResponse;
        try {
            lambdaResponse = mapper.readValue(rawJson, LambdaResponse.class);
        } catch(Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        return lambdaResponse;
    }
}
