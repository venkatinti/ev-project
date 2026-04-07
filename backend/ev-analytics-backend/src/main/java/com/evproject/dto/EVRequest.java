//package com.evproject.dto;
//
//public class EVRequest {
//
//    private int year;
//    private String state;
//    private String vehicleType;
//
//    // Getters & Setters
//
//    public int getYear() {
//        return year;
//    }
//
//    public void setYear(int year) {
//        this.year = year;
//    }
//
//    public String getState() {
//        return state;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//    public String getVehicleType() {
//        return vehicleType;
//    }
//
//    public void setVehicleType(String vehicleType) {
//        this.vehicleType = vehicleType;
//    }
//}

package com.evproject.dto;

public class EVRequest {

    private Integer year;
    private String state;
    private String vehicleType;

    // ✅ DEFAULT CONSTRUCTOR (IMPORTANT)
    public EVRequest() {}

    // ✅ SIMPLE GETTERS (NO LOGIC)
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }
}