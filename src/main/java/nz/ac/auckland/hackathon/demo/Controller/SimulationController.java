package nz.ac.auckland.hackathon.demo.Controller;

import org.json.JSONObject;
import org.json.JSONPointer;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient;

public class SimulationController {
    // Use the native inference API to send a text message to Anthropic Claude.


    public static String invokeModel() {

        // Create a Bedrock Runtime client in the AWS Region you want to use.
        // Replace the DefaultCredentialsProvider with your preferred credentials provider.
        var client = BedrockRuntimeClient.builder()
                .credentialsProvider(ProfileCredentialsProvider.create("AHProf"))
                .region(Region.AP_SOUTHEAST_2)
                .build();

        // Set the model ID, e.g., Claude 3 Haiku.
        var modelId = "amazon.nova-lite-v1:0";

        // The InvokeModel API uses the model's native payload.
        // Learn more about the available inference parameters and response fields at:
        // https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html
        var nativeRequestTemplate = """
            {
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": "{{prompt}}"
                            }
                        ]
                    }
                ],
                "inferenceConfig": {
                    "maxTokens": 1024,
                    "temperature": 0.5,
                    "topK": 10,
                    "topP": 0.9
                }
            }""";

        // Define the prompt for the model.
        var prompt = "Describe the purpose of a 'hello world' program in one line.";

        // Embed the prompt in the model's native request payload.
        String nativeRequest = nativeRequestTemplate.replace("{{prompt}}", prompt);

        try {
            // Encode and send the request to the Bedrock Runtime.
            var response = client.invokeModel(request -> request
                    .body(SdkBytes.fromUtf8String(nativeRequest))
                    .modelId(modelId)
            );

            // Decode the response body.
            var responseBody = new JSONObject(response.body().asUtf8String());

            // Retrieve the generated text from the model's response.
            var text = new JSONPointer("/output/message/content/0/text").queryFrom(responseBody).toString();
            System.out.println(text);

            return text;

        } catch (SdkClientException e) {
            System.err.printf("ERROR: Can't invoke '%s'. Reason: %s", modelId, e.getMessage());
            throw new RuntimeException(e);
            }
        }
    }
