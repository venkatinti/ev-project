//package com.evproject.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.evproject.model.EVData;
//import com.evproject.service.EVService;
//import com.evproject.dto.EVRequest;
//
//@RestController
//@RequestMapping("/api/ev")
//@CrossOrigin(origins = "*")
//public class EVController {
//
//    @Autowired
//    private EVService service;
//
//    // ================= FILTER API =================
//    @PostMapping("/filter")
//    public List<EVData> filterData(@RequestBody EVRequest request) {
//
//        return service.filterData(
//            request.getYear(),
//            request.getState(),
//            request.getVehicleType()
//        );
//    }
//
//    // ================= GET ALL DATA (IMPORTANT FOR FILTERS) =================
//    @GetMapping("/all")
//    public List<EVData> getAllData() {
//        return service.getAllData();
//    }
//}


//package com.evproject.controller;
//
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.evproject.model.EVData;
//import com.evproject.service.EVService;
//import com.evproject.dto.EVRequest;
//
//@RestController
//@RequestMapping("/api/ev")
//@CrossOrigin(origins = "*")
//public class EVController {
//
//    @Autowired
//    private EVService service;
//
//    // ================= FILTER API =================
//    @PostMapping("/filter")
//    public List<EVData> filterData(@RequestBody EVRequest request) {
//        return service.filterData(
//            request.getYear() > 0 ? request.getYear() : null,
//            request.getState(),
//            request.getVehicleType()
//        );
//    }
//
//    // ================= GET ALL DATA =================
//    @GetMapping("/all")
//    public List<EVData> getAllData() {
//        return service.getAllData();
//    }
//
//    // ================= GET FILTER OPTIONS (Fast) =================
//    @GetMapping("/filter-options")
//    public Map<String, Object> getFilterOptions() {
//        return service.getFilterOptions();
//    }
//
//    // ================= GET CHART DATA (Aggregated - Fast) =================
//    @PostMapping("/chart-data")
//    public Map<String, Object> getChartData(@RequestBody EVRequest request) {
//        return service.getChartData(
//            request.getYear() > 0 ? request.getYear() : null,
//            request.getState(),
//            request.getVehicleType()
//        );
//    }
//
//    // ================= GET SUMMARY STATS (Fast) =================
//    @PostMapping("/stats")
//    public Map<String, Object> getSummaryStats(@RequestBody EVRequest request) {
//        return service.getSummaryStats(
//            request.getYear() > 0 ? request.getYear() : null,
//            request.getState(),
//            request.getVehicleType()
//        );
//    }
//}

package com.evproject.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.evproject.model.EVData;
import com.evproject.service.EVService;
import com.evproject.service.ExternalAPIService;
import com.evproject.dto.EVRequest;

@RestController
@RequestMapping("/api/ev")
@CrossOrigin(origins = "*")
public class EVController {

    @Autowired
    private EVService service;
    
    @Autowired
    private ExternalAPIService externalAPIService;
    
    @GetMapping("/live-alerts")
    public Map<String, String> getLiveAlerts() {
        return service.getLiveApiAlerts();
    }

    // ================= FILTER API =================
    @PostMapping("/filter")
    public List<EVData> filterData(@RequestBody EVRequest request) {

        Integer year = (request.getYear() != null && request.getYear() > 0)
                ? request.getYear() : null;

        return service.filterData(
                year,
                request.getState(),
                request.getVehicleType()
        );
    }

    // ================= GET ALL DATA =================
    @GetMapping("/all")
    public List<EVData> getAllData() {
        return service.getAllData();
    }

    // ================= GET FILTER OPTIONS =================
    @GetMapping("/filter-options")
    public Map<String, Object> getFilterOptions() {
        return service.getFilterOptions();
    }

    // ================= GET CHART DATA =================
    @PostMapping("/chart-data")
    public Map<String, Object> getChartData(@RequestBody EVRequest request) {

        Integer year = (request.getYear() != null && request.getYear() > 0)
                ? request.getYear() : null;

        return service.getChartData(
                year,
                request.getState(),
                request.getVehicleType()
        );
    }

    // ================= GET SUMMARY STATS =================
    @PostMapping("/stats")
    public Map<String, Object> getSummaryStats(@RequestBody EVRequest request) {

        Integer year = (request.getYear() != null && request.getYear() > 0)
                ? request.getYear() : null;

        return service.getSummaryStats(
                year,
                request.getState(),
                request.getVehicleType()
        );
    }

    // ================= 🚨 SMART ALERT API (WITH USER EMAIL 🔥) =================
    @PostMapping("/alerts")
    public List<Map<String, Object>> getAlerts(
            @RequestBody(required = false) EVRequest request,
            @RequestParam(required = false) String email   // 🔥 NEW
    ) {

        Integer year = (request != null && request.getYear() != null && request.getYear() > 0)
                ? request.getYear() : null;

        String state = (request != null) ? request.getState() : null;
        String vehicleType = (request != null) ? request.getVehicleType() : null;

        return service.getInfrastructureAlerts(year, state, vehicleType, email);
    }
}