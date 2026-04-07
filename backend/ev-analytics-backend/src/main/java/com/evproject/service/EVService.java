//package com.evproject.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.evproject.model.EVData;
//import com.evproject.repository.EVRepository;
//
//@Service
//public class EVService {
//
//    @Autowired
//    private EVRepository repo;
//
//    // ================= FILTER DATA =================
//    public List<EVData> filterData(Integer year, String state, String vehicleType) {
//
//        // 👉 Get all data once
//        List<EVData> allData = repo.findAll();
//
//        // 👉 Debug (optional but useful)
//        System.out.println("Filters -> Year: " + year + ", State: " + state + ", Vehicle: " + vehicleType);
//
//        // 👉 Apply dynamic filtering
//        List<EVData> filteredData = allData.stream()
//
//            // YEAR FILTER
//        		.filter(e -> year == null || e.getYear() == year)
//
//            // STATE FILTER (case-insensitive + empty safe)
//            .filter(e -> state == null || state.trim().isEmpty() 
//                || e.getState().equalsIgnoreCase(state.trim()))
//
//            // VEHICLE TYPE FILTER (case-insensitive + empty safe)
//            .filter(e -> vehicleType == null || vehicleType.trim().isEmpty() 
//                || e.getVehicleType().equalsIgnoreCase(vehicleType.trim()))
//
//            .collect(Collectors.toList());
//
//        // 👉 IMPORTANT: fallback (avoid empty UI)
//        if (filteredData.isEmpty()) {
//            System.out.println("No data found for filters → returning ALL data");
//            return allData;
//        }
//
//        return filteredData;
//    }
//
//    // ================= GET ALL DATA =================
//    public List<EVData> getAllData() {
//        return repo.findAll();
//    }
//}


//package com.evproject.service;
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.evproject.model.EVData;
//import com.evproject.repository.EVRepository;
//
//@Service
//public class EVService {
//
//    @Autowired
//    private EVRepository repo;
//
//    // ================= FILTER OPTIONS (Fast) =================
//    public Map<String, Object> getFilterOptions() {
//        Map<String, Object> options = new HashMap<>();
//        options.put("years", repo.findDistinctYears());
//        options.put("states", repo.findDistinctStates());
//        options.put("vehicleTypes", repo.findDistinctVehicleTypes());
//        return options;
//    }
//
//    // ================= FILTER DATA (Database Level) =================
//    public List<EVData> filterData(Integer year, String state, String vehicleType) {
//        
//        // Clean empty strings to null
//        if (state != null && state.trim().isEmpty()) state = null;
//        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;
//        
//        System.out.println("DB Filters -> Year: " + year + ", State: " + state + ", Vehicle: " + vehicleType);
//
//        List<EVData> filteredData = repo.findWithFilters(year, state, vehicleType);
//
//        // Fallback only if truly no data
//        if (filteredData.isEmpty()) {
//            System.out.println("No match found → returning ALL data");
//            return repo.findAll();
//        }
//
//        return filteredData;
//    }
//
//    // ================= GET ALL DATA =================
//    public List<EVData> getAllData() {
//        return repo.findAll();
//    }
//
//    // ================= CHART DATA (Aggregated) =================
//    public Map<String, Object> getChartData(Integer year, String state, String vehicleType) {
//        
//        if (state != null && state.trim().isEmpty()) state = null;
//        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;
//
//        Map<String, Object> chartData = new HashMap<>();
//
//        // Year-wise sales
//        List<Object[]> yearData = repo.getSalesByYear(year, state, vehicleType);
//        chartData.put("yearData", yearData.stream()
//            .map(arr -> Map.of("year", arr[0], "totalEV", arr[1]))
//            .collect(Collectors.toList()));
//
//        // State-wise sales
//        List<Object[]> stateData = repo.getSalesByState(year, state, vehicleType);
//        chartData.put("stateData", stateData.stream()
//            .map(arr -> Map.of("state", arr[0], "totalEV", arr[1]))
//            .limit(5)
//            .collect(Collectors.toList()));
//
//        // Vehicle type distribution
//        List<Object[]> vehicleData = repo.getSalesByVehicleType(year, state, vehicleType);
//        chartData.put("vehicleData", vehicleData.stream()
//            .map(arr -> Map.of("name", arr[0], "value", arr[1]))
//            .collect(Collectors.toList()));
//
//        return chartData;
//    }
//
//    // ================= SUMMARY STATS (Fast) =================
//    public Map<String, Object> getSummaryStats(Integer year, String state, String vehicleType) {
//        
//        if (state != null && state.trim().isEmpty()) state = null;
//        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;
//
//        Map<String, Object> stats = new HashMap<>();
//        
//        Long totalSales = repo.getTotalEVSales(year, state, vehicleType);
//        Double avgAdoption = repo.getAvgAdoptionRate(year, state, vehicleType);
//        Double totalCO2 = repo.getTotalCO2Saved(year, state, vehicleType);
//
//        stats.put("totalEVSales", totalSales != null ? totalSales : 0);
//        stats.put("avgAdoptionRate", avgAdoption != null ? avgAdoption : 0.0);
//        stats.put("totalCO2Saved", totalCO2 != null ? totalCO2 : 0.0);
//
//        // Get top performing state
//        List<Object[]> stateData = repo.getSalesByState(year, state, vehicleType);
//        if (!stateData.isEmpty()) {
//            stats.put("topState", stateData.get(0)[0]);
//        }
//
//        return stats;
//    }
//}


package com.evproject.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.evproject.model.EVData;
import com.evproject.model.User;
import com.evproject.repository.EVRepository;
import com.evproject.repository.UserRepository;

@Service
public class EVService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EVRepository repo;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ExternalAPIService externalAPIService;
    
    private Map<String, String> lastApiStatus = new HashMap<>();
    
    public List<EVData> getAllEVData() {
        return repo.findAll();
    }

    // ================= FILTER OPTIONS =================
    public Map<String, Object> getFilterOptions() {
        Map<String, Object> options = new HashMap<>();
        options.put("years", repo.findDistinctYears());
        options.put("states", repo.findDistinctStates());
        options.put("vehicleTypes", repo.findDistinctVehicleTypes());
        return options;
    }

    // ================= FILTER DATA =================
    public List<EVData> filterData(Integer year, String state, String vehicleType) {

        if (state != null && state.trim().isEmpty()) state = null;
        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;

        List<EVData> filteredData = repo.findWithFilters(year, state, vehicleType);

        return (filteredData == null) ? new ArrayList<>() : filteredData;
    }

    // ================= GET ALL DATA =================
    public List<EVData> getAllData() {
        return repo.findAll();
    }

    // ================= CHART DATA =================
    public Map<String, Object> getChartData(Integer year, String state, String vehicleType) {

        if (state != null && state.trim().isEmpty()) state = null;
        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;

        Map<String, Object> chartData = new HashMap<>();

        chartData.put("yearData", repo.getSalesByYear(year, state, vehicleType)
                .stream().map(arr -> Map.of("year", arr[0], "totalEV", arr[1]))
                .collect(Collectors.toList()));

        chartData.put("stateData", repo.getSalesByState(year, state, vehicleType)
                .stream().map(arr -> Map.of("state", arr[0], "totalEV", arr[1]))
                .limit(5).collect(Collectors.toList()));

        chartData.put("vehicleData", repo.getSalesByVehicleType(year, state, vehicleType)
                .stream().map(arr -> Map.of("name", arr[0], "value", arr[1]))
                .collect(Collectors.toList()));

        return chartData;
    }

    // ================= SUMMARY =================
    public Map<String, Object> getSummaryStats(Integer year, String state, String vehicleType) {

        if (state != null && state.trim().isEmpty()) state = null;
        if (vehicleType != null && vehicleType.trim().isEmpty()) vehicleType = null;

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalEVSales", Optional.ofNullable(repo.getTotalEVSales(year, state, vehicleType)).orElse(0L));
        stats.put("avgAdoptionRate", Optional.ofNullable(repo.getAvgAdoptionRate(year, state, vehicleType)).orElse(0.0));
        stats.put("totalCO2Saved", Optional.ofNullable(repo.getTotalCO2Saved(year, state, vehicleType)).orElse(0.0));

        List<Object[]> stateData = repo.getSalesByState(year, state, vehicleType);
        if (!stateData.isEmpty()) {
            stats.put("topState", stateData.get(0)[0]);
        }

        return stats;
    }

    // ================= 🚨 ALERT SYSTEM =================
    public List<Map<String, Object>> getInfrastructureAlerts(Integer year, String state, String vehicleType, String email) {

        List<EVData> data = filterData(year, state, vehicleType);

        if (data.isEmpty()) {
            return new ArrayList<>();
        }

        List<Map<String, Object>> alerts = new ArrayList<>();
        double IDEAL_RATIO = 0.05;

        Map<String, List<EVData>> grouped = data.stream()
                .collect(Collectors.groupingBy(EVData::getState));

        for (String stateName : grouped.keySet()) {

            List<EVData> stateData = grouped.get(stateName);

            int totalEV = stateData.stream().mapToInt(EVData::getEvSales).sum();
            int totalStations = stateData.stream().mapToInt(EVData::getChargingStations).sum();

            if (totalEV == 0) continue;

            double gap = (totalEV * IDEAL_RATIO) - totalStations;

            String severity;
            String message;

            if (gap > 150) {
                severity = "CRITICAL";
                message = stateName + " needs " + (int) gap + " more charging stations";
            } else if (gap > 50) {
                severity = "MODERATE";
                message = stateName + " needs " + (int) gap + " additional stations";
            } else {
                severity = "GOOD";
                message = stateName + " is balanced";
            }

            Map<String, Object> alert = new HashMap<>();
            alert.put("state", stateName);
            alert.put("severity", severity);
            alert.put("message", message);

            alerts.add(alert);
        }

        // ✅ SORT
        List<String> order = Arrays.asList("CRITICAL", "MODERATE", "GOOD");
        alerts.sort((a, b) ->
                Integer.compare(order.indexOf(a.get("severity")), order.indexOf(b.get("severity")))
        );

        // ================= 📧 HTML EMAIL =================
        try {
            boolean hasCritical = alerts.stream()
                    .anyMatch(a -> "CRITICAL".equals(a.get("severity")));

            if (hasCritical) {

                StringBuilder emailBody = new StringBuilder();

                emailBody.append("""
                <html>
                <body style="font-family: Arial; background:#0f172a; color:white; padding:20px;">
                    <h2 style="color:#ef4444;">🚨 CRITICAL EV Infrastructure Alerts</h2>
                    <div style="margin-top:20px;">
                """);

                for (Map<String, Object> alert : alerts) {
                    if ("CRITICAL".equals(alert.get("severity"))) {

                        emailBody.append("""
                            <div style="background:#1e293b; padding:15px; margin-bottom:10px; border-radius:10px;">
                                <p style="color:#f87171; font-weight:bold;">🔴 CRITICAL</p>
                                <p style="font-size:16px;">
                        """);

                        emailBody.append(alert.get("message"));

                        emailBody.append("""
                                </p>
                            </div>
                        """);
                    }
                }

                emailBody.append("""
                    </div>
                </body>
                </html>
                """);

                if (email != null && !email.isEmpty()) {
                    emailService.sendHtmlEmail(
                        email,
                        "🚨 CRITICAL EV Alerts",
                        emailBody.toString()
                    );
                }

                System.out.println("✅ HTML Email sent");
            }

        } catch (Exception e) {
            System.out.println("❌ Email error: " + e.getMessage());
        }

        return alerts;
    }
    
 // ================= 🌐 API STATE STATUS =================
    public Map<String, String> generateStateStatus() {

        System.out.println("🌐 API ALERT TRIGGERED");

        List<Map<String, Object>> stations = externalAPIService.fetchChargingStations();

        if (stations == null || stations.isEmpty()) return new HashMap<>();

        Map<String, Long> stateCount = stations.stream()
                .collect(Collectors.groupingBy(station -> {
                    try {
                        Map<String, Object> address = (Map<String, Object>) station.get("AddressInfo");
                        return (String) address.getOrDefault("StateOrProvince", "Unknown");
                    } catch (Exception e) {
                        return "Unknown";
                    }
                }, Collectors.counting()));

        Map<String, String> stateStatus = new HashMap<>();

        for (Map.Entry<String, Long> entry : stateCount.entrySet()) {

            long count = entry.getValue();

            String status;
            if (count <= 3) status = "CRITICAL";
            else if (count <= 10) status = "MODERATE";
            else status = "GOOD";

            stateStatus.put(entry.getKey(), status);
        }

        return stateStatus;
    }

 // ================= 🔄 CHANGE DETECTION =================
    public List<String> detectChanges(Map<String, String> newStatus) {

        List<String> changes = new ArrayList<>();

        for (String state : newStatus.keySet()) {

            String oldVal = lastApiStatus.get(state);
            String newVal = newStatus.get(state);

            if (oldVal == null || !oldVal.equals(newVal)) {

                String message;

                if ("CRITICAL".equals(newVal)) {
                    message = "🔴 CRITICAL: " + state + " needs urgent charging expansion";
                } else if ("MODERATE".equals(newVal)) {
                    message = "🟡 MODERATE: " + state + " has limited stations";
                } else {
                    message = "🟢 GOOD: " + state + " is stable";
                }

                changes.add(message);
            }
        }

        // ✅ update cache
        lastApiStatus = new HashMap<>(newStatus);

        return changes;
    }
    
 
    
 // ================= ⏰ AUTO API EMAIL =================
//  @Scheduled(cron = "0 0 0 * * ?")
//    @Scheduled(cron = "0 */5 * * * ?")
    @Scheduled(cron = "0 */30 * * * ?") // every 30 minutes
    public void autoSendRealTimeAlerts() {

    	System.out.println("API Mail Sent");
        try {
//        	Map<String, String> newStatus = generateStateStatus();
        	Map<String, String> newStatus = getLiveApiAlerts();
        	List<String> changes = detectChanges(newStatus);

        	if (changes.isEmpty()) {
                System.out.println("⏸ No change → No email sent");
                return;
            }

            StringBuilder body = new StringBuilder();
            body.append("<h2>⚡ EV STATUS CHANGED</h2>");

            for (String msg : changes) {
                body.append("<p>").append(msg).append("</p>");
            }

            List<User> users = userRepository.findAll();

            for (User user : users) {
                emailService.sendHtmlEmail(
                        user.getEmail(),
                        "⚡ EV Alert Update",
                        body.toString()
                );
            }

            System.out.println("✅ Email sent ONLY for changes");

        } catch (Exception e) {
            System.out.println("❌ Scheduler error: " + e.getMessage());
        }
    }



 // ================= 📧 DB EMAIL =================
    private void sendDBEmail(List<Map<String, Object>> alerts, String email) {

        boolean hasCritical = alerts.stream()
                .anyMatch(a -> "CRITICAL".equals(a.get("severity")));

        if (!hasCritical || email == null || email.isEmpty()) return;

        StringBuilder body = new StringBuilder();
        body.append("<h2>🚨 DB CRITICAL ALERTS</h2>");

        for (Map<String, Object> alert : alerts) {
            if ("CRITICAL".equals(alert.get("severity"))) {
                body.append("<p>🔴 ").append(alert.get("message")).append("</p>");
            }
        }

        emailService.sendHtmlEmail(email, "🚨 EV Alerts (DB)", body.toString());

        System.out.println("✅ DB Email sent");
    }

    // ================= 🌐 FOR DASHBOARD =================
    public Map<String, String> getLiveApiAlerts() {
        return generateStateStatus();
    }
}