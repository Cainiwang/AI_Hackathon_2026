package nz.ac.auckland.hackathon.demo.Service;

import org.springframework.stereotype.Service;

import nz.ac.auckland.hackathon.demo.DTO.Request;
import nz.ac.auckland.hackathon.demo.DTO.Response;

@Service
public class DemoService {
     /*
   * 临时假设：
   * 银行利率每提高 1 个百分点，
   * 客户数量变化率为 -2%。
   *
   * 这个数字只是为了展示程序流程，
   * 不是银行真实数据。
   */
  private static final double CUSTOMER_SENSITIVITY = 2.0;

  public Response simulate(Request request) {

    // 例如：6.0 - 5.8 = 0.2 percentage points
    double rateChange =
        request.targetBankRate() - request.currentBankRate();

    /*
     * 暂时估算客户变化率。
     *
     * 利率提高 0.2 个百分点：
     * -0.2 × 2.0 = -0.4%
     */
    double estimatedCustomerChangeRate =
        -rateChange * CUSTOMER_SENSITIVITY;

    /*
     * 假设每个客户的 averageBalance 都受到利率变化影响。
     *
     * 总余额 = 客户数量 × 平均余额
     */
    double totalBalance =
        request.customerCount() * request.averageBalance();

    /*
     * 年度利息收入变化：
     *
     * totalBalance × rateChange / 100
     *
     * 因为输入的 0.2 表示 0.2%，所以要除以 100。
     */
    double estimatedAnnualRevenueChange =
        totalBalance * rateChange / 100.0;

    String explanation = createExplanation(rateChange);

    return new Response(
        round(rateChange),
        round(estimatedCustomerChangeRate),
        round(estimatedAnnualRevenueChange),
        "local-demo-v1",
        explanation,
        "Prototype result based on synthetic assumptions. "
            + "Not suitable for real financial decisions."
    );
  }

  private String createExplanation(double rateChange) {
    if (rateChange > 0) {
      return "The proposed rate is higher than the current rate. "
          + "The model estimates increased interest revenue, "
          + "but potentially lower customer retention.";
    }

    if (rateChange < 0) {
      return "The proposed rate is lower than the current rate. "
          + "The model estimates reduced interest revenue, "
          + "but potentially improved customer retention.";
    }

    return "The proposed rate is unchanged, so the model estimates "
        + "no direct rate-related change.";
  }

  private double round(double value) {
    return Math.round(value * 100.0) / 100.0;
  }
}
