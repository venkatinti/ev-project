package com.evproject.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;

@Service
public class ExternalAPIService {

    @Value("${opencharge.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.openchargemap.io/v3/poi/";

    public List<Map<String, Object>> fetchChargingStations() {

        RestTemplate restTemplate = new RestTemplate();

        String url = BASE_URL + "?output=json&countrycode=IN&maxresults=50&key=" + apiKey;

        List<Map<String, Object>> response =
                restTemplate.getForObject(url, List.class);

        return response != null ? response : new ArrayList<>();
    }
    
    
}
