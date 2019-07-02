package com.graphs.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Parameters {
    private int limit;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer iterations;
}
