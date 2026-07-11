package nz.ac.auckland.hackathon.demo.DTO;

public record Request(
        double currentOcr,
        double currentBankRate,
        double targetBankRate,
        int customerCount,
        double averageBalance) {
}
