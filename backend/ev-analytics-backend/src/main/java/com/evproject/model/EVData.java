package com.evproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ev_data")
public class EVData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "record_id")
    private int recordId;

    @Column(name = "year")
    private int year;

    @Column(name = "month")
    private String month;

    @Column(name = "state")
    private String state;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "charging_type")
    private String chargingType;

    @Column(name = "subsidy_available")
    private String subsidyAvailable;

    @Column(name = "urban_rural")
    private String urbanRural;

    @Column(name = "battery_type")
    private String batteryType;

    @Column(name = "season")
    private String season;

    @Column(name = "policy_support_level")
    private String policySupportLevel;

    @Column(name = "ev_sales")
    private int evSales;

    @Column(name = "ev_registrations")
    private int evRegistrations;

    @Column(name = "charging_stations")
    private int chargingStations;

    @Column(name = "average_ev_price_lakhs")
    private double averageEvPriceLakhs;

    @Column(name = "fuel_price_per_litre")
    private double fuelPricePerLitre;

    @Column(name = "electricity_tariff_per_kwh")
    private double electricityTariffPerKwh;

    @Column(name = "battery_cost_per_kwh")
    private double batteryCostPerKwh;

    @Column(name = "government_subsidy_amount")
    private double governmentSubsidyAmount;

    @Column(name = "co2_saved_tons")
    private double co2SavedTons;

    @Column(name = "public_awareness_index")
    private double publicAwarenessIndex;

    @Column(name = "average_range_km")
    private double averageRangeKm;

    @Column(name = "maintenance_cost_per_year")
    private double maintenanceCostPerYear;

    @Column(name = "total_vehicle_registrations")
    private int totalVehicleRegistrations;

    @Column(name = "ice_vehicle_sales")
    private int iceVehicleSales;

    @Column(name = "fuel_consumption_reduction_litres")
    private double fuelConsumptionReductionLitres;

    @Column(name = "air_pollution_index")
    private double airPollutionIndex;

    @Column(name = "average_daily_charging_sessions")
    private double averageDailyChargingSessions;

    @Column(name = "ev_adoption_rate")
    private double evAdoptionRate;

    @Column(name = "fuel_saved_per_ev")
    private double fuelSavedPerEv;

    @Column(name = "co2_per_ev")
    private double co2PerEv;

    // ================= GETTERS & SETTERS =================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getRecordId() { return recordId; }
    public void setRecordId(int recordId) { this.recordId = recordId; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getChargingType() { return chargingType; }
    public void setChargingType(String chargingType) { this.chargingType = chargingType; }

    public String getSubsidyAvailable() { return subsidyAvailable; }
    public void setSubsidyAvailable(String subsidyAvailable) { this.subsidyAvailable = subsidyAvailable; }

    public String getUrbanRural() { return urbanRural; }
    public void setUrbanRural(String urbanRural) { this.urbanRural = urbanRural; }

    public String getBatteryType() { return batteryType; }
    public void setBatteryType(String batteryType) { this.batteryType = batteryType; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getPolicySupportLevel() { return policySupportLevel; }
    public void setPolicySupportLevel(String policySupportLevel) { this.policySupportLevel = policySupportLevel; }

    public int getEvSales() { return evSales; }
    public void setEvSales(int evSales) { this.evSales = evSales; }

    public int getEvRegistrations() { return evRegistrations; }
    public void setEvRegistrations(int evRegistrations) { this.evRegistrations = evRegistrations; }

    public int getChargingStations() { return chargingStations; }
    public void setChargingStations(int chargingStations) { this.chargingStations = chargingStations; }

    public double getAverageEvPriceLakhs() { return averageEvPriceLakhs; }
    public void setAverageEvPriceLakhs(double averageEvPriceLakhs) { this.averageEvPriceLakhs = averageEvPriceLakhs; }

    public double getFuelPricePerLitre() { return fuelPricePerLitre; }
    public void setFuelPricePerLitre(double fuelPricePerLitre) { this.fuelPricePerLitre = fuelPricePerLitre; }

    public double getElectricityTariffPerKwh() { return electricityTariffPerKwh; }
    public void setElectricityTariffPerKwh(double electricityTariffPerKwh) { this.electricityTariffPerKwh = electricityTariffPerKwh; }

    public double getBatteryCostPerKwh() { return batteryCostPerKwh; }
    public void setBatteryCostPerKwh(double batteryCostPerKwh) { this.batteryCostPerKwh = batteryCostPerKwh; }

    public double getGovernmentSubsidyAmount() { return governmentSubsidyAmount; }
    public void setGovernmentSubsidyAmount(double governmentSubsidyAmount) { this.governmentSubsidyAmount = governmentSubsidyAmount; }

    public double getCo2SavedTons() { return co2SavedTons; }
    public void setCo2SavedTons(double co2SavedTons) { this.co2SavedTons = co2SavedTons; }

    public double getPublicAwarenessIndex() { return publicAwarenessIndex; }
    public void setPublicAwarenessIndex(double publicAwarenessIndex) { this.publicAwarenessIndex = publicAwarenessIndex; }

    public double getAverageRangeKm() { return averageRangeKm; }
    public void setAverageRangeKm(double averageRangeKm) { this.averageRangeKm = averageRangeKm; }

    public double getMaintenanceCostPerYear() { return maintenanceCostPerYear; }
    public void setMaintenanceCostPerYear(double maintenanceCostPerYear) { this.maintenanceCostPerYear = maintenanceCostPerYear; }

    public int getTotalVehicleRegistrations() { return totalVehicleRegistrations; }
    public void setTotalVehicleRegistrations(int totalVehicleRegistrations) { this.totalVehicleRegistrations = totalVehicleRegistrations; }

    public int getIceVehicleSales() { return iceVehicleSales; }
    public void setIceVehicleSales(int iceVehicleSales) { this.iceVehicleSales = iceVehicleSales; }

    public double getFuelConsumptionReductionLitres() { return fuelConsumptionReductionLitres; }
    public void setFuelConsumptionReductionLitres(double fuelConsumptionReductionLitres) { this.fuelConsumptionReductionLitres = fuelConsumptionReductionLitres; }

    public double getAirPollutionIndex() { return airPollutionIndex; }
    public void setAirPollutionIndex(double airPollutionIndex) { this.airPollutionIndex = airPollutionIndex; }

    public double getAverageDailyChargingSessions() { return averageDailyChargingSessions; }
    public void setAverageDailyChargingSessions(double averageDailyChargingSessions) { this.averageDailyChargingSessions = averageDailyChargingSessions; }

    public double getEvAdoptionRate() { return evAdoptionRate; }
    public void setEvAdoptionRate(double evAdoptionRate) { this.evAdoptionRate = evAdoptionRate; }

    public double getFuelSavedPerEv() { return fuelSavedPerEv; }
    public void setFuelSavedPerEv(double fuelSavedPerEv) { this.fuelSavedPerEv = fuelSavedPerEv; }

    public double getCo2PerEv() { return co2PerEv; }
    public void setCo2PerEv(double co2PerEv) { this.co2PerEv = co2PerEv; }
}