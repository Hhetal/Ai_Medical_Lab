import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const predictDisease = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Please provide symptoms",
      });
    }

    const prompt = `Based on the following symptoms: "${data}", please provide a medical diagnosis with the following information:
    1. Predicted disease
    2. Disease description
    3. Precautions to take
    4. Recommended medications
    5. Recommended workouts
    6. Recommended diet

    Please format the response as a JSON object with the following keys:
    {
      "predicted_disease": "",
      "dis_des": "",
      "my_precautions": "",
      "medications": "",
      "workout": "",
      "rec_diet": ""
    }`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.data.choices[0].text;
    const parsedResponse = JSON.parse(response);

    res.status(200).json({
      success: true,
      message: "Disease predicted successfully",
      data: parsedResponse,
    });
  } catch (error) {
    console.error("Error predicting disease:", error);
    res.status(500).json({
      success: false,
      message: "Error predicting disease",
      error: error.message,
    });
  }
}; 