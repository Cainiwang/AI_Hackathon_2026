package nz.ac.auckland.hackathon.demo;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import nz.ac.auckland.hackathon.demo.Controller.SimulationController;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient;

@SpringBootApplication
public class DemoApplication {

	 public static void main(String[] args) {
		// 在启动 Spring Boot 应用之前，尝试释放 8081 端口
		killProcessOnPort(8081);
	 	SpringApplication.run(DemoApplication.class, args);
		try (BedrockRuntimeClient client = BedrockRuntimeClient.builder().build()) {
			SimulationController.invokeModel();
		}
	 }

	 private static void killProcessOnPort(int port) {
        try {
            // 查找占用该端口的 PID
            Process process = Runtime.getRuntime().exec("cmd /c netstat -ano | findstr :" + port);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            
            while ((line = reader.readLine()) != null) {
                if (line.contains("LISTENING")) {
                    String[] tokens = line.trim().split("\\s+");
                    String pid = tokens[tokens.length - 1];
                    
                    // 获取当前进程自己的 PID，避免误杀自己
                    long currentPid = ProcessHandle.current().pid();
                    if (!pid.equals(String.valueOf(currentPid))) {
                        System.out.println("⚠️ 发现残留进程 (PID: " + pid + ") 正在占用端口 " + port + "，正在自动回收...");
                        Runtime.getRuntime().exec("taskkill /F /PID " + pid).waitFor();
                        System.out.println("✅ 端口 " + port + " 已成功释放！");
                    }
                }
            }
        } catch (Exception e) {
            // 如果清理失败，仅打印日志，不影响正常启动尝试
            System.err.println("自动清理端口时出错: " + e.getMessage());
        }
    }
}


