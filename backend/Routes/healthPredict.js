import express from "express";
import cors from "cors";

const router = express.Router();

// Enable CORS for this route
router.use(cors());

// Simple disease database
const diseaseDatabase = {
  "fever": {
    "predicted_disease": "Common Cold or Flu",
    "dis_des": "A viral infection affecting the respiratory system",
    "my_precautions": "Rest, stay hydrated, avoid contact with others, wash hands frequently",
    "medications": "Paracetamol for fever, over-the-counter cold medications",
    "workout": "Light stretching, avoid strenuous exercise",
    "rec_diet": "Clear fluids, chicken soup, fruits rich in vitamin C"
  },
  "headache": {
    "predicted_disease": "Tension Headache",
    "dis_des": "Common type of headache caused by stress or muscle tension",
    "my_precautions": "Reduce stress, maintain good posture, take regular breaks",
    "medications": "Over-the-counter pain relievers like ibuprofen or acetaminophen",
    "workout": "Gentle neck stretches, yoga, walking",
    "rec_diet": "Stay hydrated, avoid caffeine, eat regular meals"
  },
  "cough": {
    "predicted_disease": "Upper Respiratory Infection",
    "dis_des": "Infection affecting the upper respiratory tract",
    "my_precautions": "Rest, stay hydrated, avoid irritants, cover mouth when coughing",
    "medications": "Cough suppressants, expectorants if needed",
    "workout": "Light walking, avoid strenuous exercise",
    "rec_diet": "Warm fluids, honey tea, avoid dairy products"
  },
  "fatigue": {
    "predicted_disease": "General Fatigue",
    "dis_des": "Feeling of tiredness or lack of energy",
    "my_precautions": "Get adequate sleep, manage stress, maintain regular sleep schedule",
    "medications": "Usually no medications needed, consult doctor if persistent",
    "workout": "Light exercise, walking, stretching",
    "rec_diet": "Balanced diet, stay hydrated, include iron-rich foods"
  },
  "new_symptom": {
    "predicted_disease": "Disease Name",
    "dis_des": "Description",
    "my_precautions": "Precautions",
    "medications": "Medications",
    "workout": "Workout advice",
    "rec_diet": "Diet recommendations"
  }
};

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Health prediction API is working",
    timestamp: new Date().toISOString()
  });
});

// Main prediction endpoint
router.post("/symptoms", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    
    const { data } = req.body;
    
    if (!data) {
      console.log("No symptoms provided");
      return res.status(400).json({
        success: false,
        message: "Please provide symptoms"
      });
    }

    // Convert symptoms to lowercase and split into array
    const symptoms = data.toLowerCase().split(',').map(s => s.trim());
    
    // Find matching diseases based on symptoms
    const matches = symptoms.map(symptom => diseaseDatabase[symptom]).filter(Boolean);
    
    if (matches.length === 0) {
      return res.json({
        success: true,
        data: {
          predicted_disease: "General Health Check Recommended",
          dis_des: "Based on the provided symptoms, a general health check is recommended",
          my_precautions: "Consult a healthcare professional for proper diagnosis",
          medications: "Please consult a doctor for appropriate medications",
          workout: "Light exercise as tolerated",
          rec_diet: "Maintain a balanced diet and stay hydrated"
        }
      });
    }

    // Combine multiple matches if found
    const combinedResult = {
      predicted_disease: matches.map(m => m.predicted_disease).join(" or "),
      dis_des: matches.map(m => m.dis_des).join(" "),
      my_precautions: matches.map(m => m.my_precautions).join(" "),
      medications: matches.map(m => m.medications).join(" "),
      workout: matches.map(m => m.workout).join(" "),
      rec_diet: matches.map(m => m.rec_diet).join(" ")
    };

    console.log("Generated prediction:", combinedResult);
    
    res.json({
      success: true,
      data: combinedResult
    });

  } catch (error) {
    console.error("Error in symptoms route:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error processing request"
    });
  }
});

export default router;
