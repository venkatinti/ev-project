//package com.evproject.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.evproject.model.EVData;
//
//public interface EVRepository extends JpaRepository<EVData, Long> {
//
//    // ================= SINGLE FILTER =================
//    List<EVData> findByYear(Integer year);
//
//    List<EVData> findByState(String state);
//
//    List<EVData> findByVehicleType(String vehicleType);
//
//    // ================= DOUBLE FILTER =================
//    List<EVData> findByYearAndState(Integer year, String state);
//
//    List<EVData> findByYearAndVehicleType(Integer year, String vehicleType);
//
//    List<EVData> findByStateAndVehicleType(String state, String vehicleType);
//
//    // ================= TRIPLE FILTER =================
//    List<EVData> findByYearAndStateAndVehicleType(Integer year, String state, String vehicleType);
//}

package com.evproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.evproject.model.EVData;

public interface EVRepository extends JpaRepository<EVData, Long> {

    // ================= DYNAMIC FILTER (Single Query) =================
    @Query("SELECT e FROM EVData e WHERE " +
           "(:year IS NULL OR e.year = :year) AND " +
           "(:state IS NULL OR LOWER(e.state) = LOWER(:state)) AND " +
           "(:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType))")
    List<EVData> findWithFilters(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    // ================= GET DISTINCT VALUES FOR FILTERS =================
    @Query("SELECT DISTINCT e.year FROM EVData e ORDER BY e.year")
    List<Integer> findDistinctYears();

    @Query("SELECT DISTINCT e.state FROM EVData e ORDER BY e.state")
    List<String> findDistinctStates();

    @Query("SELECT DISTINCT e.vehicleType FROM EVData e ORDER BY e.vehicleType")
    List<String> findDistinctVehicleTypes();

    // ================= AGGREGATION QUERIES (Fast Stats) =================
    @Query("SELECT SUM(e.evSales) FROM EVData e WHERE " +
           "(:year IS NULL OR e.year = :year) AND " +
           "(:state IS NULL OR LOWER(e.state) = LOWER(:state)) AND " +
           "(:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType))")
    Long getTotalEVSales(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    @Query("SELECT AVG(e.evAdoptionRate) FROM EVData e WHERE " +
           "(:year IS NULL OR e.year = :year) AND " +
           "(:state IS NULL OR LOWER(e.state) = LOWER(:state)) AND " +
           "(:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType))")
    Double getAvgAdoptionRate(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    @Query("SELECT SUM(e.co2SavedTons) FROM EVData e WHERE " +
           "(:year IS NULL OR e.year = :year) AND " +
           "(:state IS NULL OR LOWER(e.state) = LOWER(:state)) AND " +
           "(:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType))")
    Double getTotalCO2Saved(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    // ================= CHART DATA QUERIES =================
    @Query("SELECT e.year, SUM(e.evSales) FROM EVData e " +
           "WHERE (:year IS NULL OR e.year = :year) " +
           "AND (:state IS NULL OR LOWER(e.state) = LOWER(:state)) " +
           "AND (:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType)) " +
           "GROUP BY e.year ORDER BY e.year")
    List<Object[]> getSalesByYear(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    @Query("SELECT e.state, SUM(e.evSales) FROM EVData e " +
           "WHERE (:year IS NULL OR e.year = :year) " +
           "AND (:state IS NULL OR LOWER(e.state) = LOWER(:state)) " +
           "AND (:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType)) " +
           "GROUP BY e.state ORDER BY SUM(e.evSales) DESC")
    List<Object[]> getSalesByState(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );

    @Query("SELECT e.vehicleType, SUM(e.evSales) FROM EVData e " +
           "WHERE (:year IS NULL OR e.year = :year) " +
           "AND (:state IS NULL OR LOWER(e.state) = LOWER(:state)) " +
           "AND (:vehicleType IS NULL OR LOWER(e.vehicleType) = LOWER(:vehicleType)) " +
           "GROUP BY e.vehicleType")
    List<Object[]> getSalesByVehicleType(
        @Param("year") Integer year,
        @Param("state") String state,
        @Param("vehicleType") String vehicleType
    );
}