package nz.ac.auckland.hackathon.demo.DTO;

public record Response(
    double rateChange,
    double estimatedCustomerChangeRate,
    double estimatedAnnualRevenueChange,
    String modelVersion,
    String explanation,
    String warning
) {}
