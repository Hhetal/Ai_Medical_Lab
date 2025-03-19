import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/symptomchk.css";

const Symptomchk = () => {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showPrecautions, setShowPrecautions] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showDiet, setShowDiet] = useState(false);

  // List of valid symptoms for validation
  const validSymptoms = [
    // General Symptoms
    "fever", "headache", "cough", "fatigue", "body pain",
    "nausea", "dizziness", "sore throat", "runny nose",
    "chest pain", "shortness of breath", "vomiting",
    "diarrhea", "muscle pain", "joint pain", "back pain",
    "abdominal pain", "chills", "sweating", "rash",
    "swelling", "redness", "itching", "loss of appetite",
    "weight loss", "weight gain", "insomnia", "anxiety",
    "depression", "confusion", "memory loss", "tremors",
    "seizures", "numbness", "tingling", "weakness",
    "paralysis", "speech problems", "vision problems",
    "hearing problems", "breathing problems", "heart palpitations",
    "high blood pressure", "low blood pressure", "diabetes",
    "allergies", "asthma", "arthritis", "cancer", "heart disease",
    "stroke", "kidney problems", "liver problems", "thyroid problems",

    // Respiratory Symptoms
    "wheezing", "coughing up blood", "rapid breathing",
    "shallow breathing", "chest tightness", "hoarseness",
    "sinus pain", "postnasal drip", "bronchitis",
    "pneumonia", "emphysema", "chronic cough",

    // Cardiovascular Symptoms
    "irregular heartbeat", "rapid heartbeat", "slow heartbeat",
    "chest pressure", "chest burning", "leg swelling",
    "cold hands", "cold feet", "poor circulation",
    "varicose veins", "blood clots", "heart murmur",

    // Digestive Symptoms
    "stomach pain", "bloating", "gas", "constipation",
    "acid reflux", "heartburn", "indigestion", "belching",
    "loss of taste", "loss of smell", "dry mouth",
    "excessive thirst", "excessive hunger", "difficulty swallowing",
    "jaundice", "dark urine", "pale stools",

    // Neurological Symptoms
    "migraine", "cluster headache", "tension headache",
    "balance problems", "coordination problems", "muscle weakness",
    "muscle spasms", "muscle cramps", "restless legs",
    "sleep problems", "nightmares", "daytime sleepiness",
    "brain fog", "difficulty concentrating", "mood changes",
    "irritability", "panic attacks", "phobias",

    // Skin Symptoms
    "acne", "eczema", "psoriasis", "hives", "bruising",
    "pale skin", "yellow skin", "blue skin", "dry skin",
    "oily skin", "skin ulcers", "skin growths",
    "hair loss", "excessive hair growth", "nail changes",

    // Eye Symptoms
    "eye pain", "eye redness", "eye swelling",
    "blurred vision", "double vision", "light sensitivity",
    "dark spots", "floating spots", "eye discharge",
    "dry eyes", "watery eyes", "eye twitching",

    // Ear Symptoms
    "ear pain", "ear discharge", "ear ringing",
    "ear pressure", "ear itching", "ear fullness",
    "hearing loss", "vertigo", "ear infection",

    // Dental Symptoms
    "tooth pain", "gum pain", "gum bleeding",
    "tooth sensitivity", "jaw pain", "mouth sores",
    "bad breath", "tooth discoloration", "loose teeth",

    // Reproductive Symptoms
    "menstrual pain", "irregular periods", "heavy periods",
    "vaginal discharge", "vaginal itching", "vaginal bleeding",
    "breast pain", "breast lumps", "nipple discharge",
    "erectile dysfunction", "testicular pain", "penile discharge",

    // Urinary Symptoms
    "frequent urination", "painful urination", "blood in urine",
    "incontinence", "retention", "urgency",
    "cloudy urine", "foul-smelling urine", "back pain",

    // Mental Health Symptoms
    "anxiety", "depression", "mood swings",
    "panic attacks", "social anxiety", "obsessive thoughts",
    "compulsive behavior", "suicidal thoughts", "self-harm",
    "eating disorders", "substance abuse", "addiction",

    // Immune System Symptoms
    "recurrent infections", "slow healing", "frequent colds",
    "swollen lymph nodes", "night sweats", "unexplained fever",
    "chronic fatigue", "autoimmune symptoms", "allergic reactions",

    // Endocrine Symptoms
    "excessive thirst", "excessive urination", "excessive hunger",
    "unexplained weight changes", "temperature sensitivity",
    "hormonal changes", "growth problems", "sexual dysfunction",

    // Musculoskeletal Symptoms
    "joint stiffness", "joint swelling", "joint redness",
    "muscle stiffness", "muscle weakness", "muscle atrophy",
    "bone pain", "fractures", "posture problems",
    "gait problems", "balance problems", "coordination problems"
  ];

  // Function to validate symptoms
  const validateSymptoms = (symptomsList) => {
    const invalidSymptoms = symptomsList.filter(
      symptom => !validSymptoms.includes(symptom.toLowerCase())
    );

    if (invalidSymptoms.length > 0) {
      return {
        isValid: false,
        invalidSymptoms: invalidSymptoms
      };
    }
    return { isValid: true };
  };

  const handlePrediction = async () => {
    if (!symptoms.trim()) {
      setError("Please enter your symptoms");
      return;
    }

    // Split and clean symptoms
    const symptomsList = symptoms.split(',').map(s => s.trim()).filter(Boolean);
    
    // Validate symptoms
    const validation = validateSymptoms(symptomsList);
    if (!validation.isValid) {
      setError(
        `Invalid symptoms detected: ${validation.invalidSymptoms.join(', ')}. ` +
        "Please enter valid medical symptoms from the list below."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${BASE_URL}/health/symptoms`, {
        data: symptoms,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        setPrediction(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch prediction");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.message || "Failed to fetch prediction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePrediction();
    }
  };

  const commonSymptoms = [
    "fever", "headache", "cough", "fatigue", "body pain",
    "nausea", "dizziness", "sore throat", "runny nose"
  ];

  const addSymptom = (symptom) => {
    const currentSymptoms = symptoms.split(',').map(s => s.trim()).filter(Boolean);
    if (!currentSymptoms.includes(symptom)) {
      setSymptoms(currentSymptoms.length ? `${symptoms}, ${symptom}` : symptom);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-sm main-card">
            <Card.Body className="p-4">
              <div className="header-section text-center mb-4">
                <h2 className="main-title">Health Predict</h2>
                <p className="subtitle">Get instant health predictions based on your symptoms</p>
      </div>
              
              <div className="symptom__form">
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold label-text">
                    Enter Your Symptoms
                    <Badge bg="info" className="ms-2">AI Powered</Badge>
                  </Form.Label>
                  <Form.Control
              type="text"
                    placeholder="e.g., fever, headache, cough"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="form-control-lg input-field"
                  />
                  <Form.Text className="text-muted helper-text">
                    Enter your symptoms separated by commas. Only valid medical symptoms will be accepted.
                  </Form.Text>
                </Form.Group>

                <div className="common-symptoms mb-4">
                  <p className="text-muted mb-2">Common Symptoms:</p>
                  <div className="symptom-tags">
                    {commonSymptoms.map((symptom, index) => (
                      <Button
                        key={index}
                        variant="outline-secondary"
                        size="sm"
                        className="symptom-tag"
                        onClick={() => addSymptom(symptom)}
                      >
                        {symptom}
                      </Button>
                    ))}
                  </div>
          </div>

                <Button
                  className="btn predict-btn w-100 py-3"
                  onClick={handlePrediction}
                  disabled={loading || !symptoms.trim()}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-stethoscope me-2"></i>
                      Get Prediction
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3 error-alert">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              {prediction && (
                <div className="prediction__result mt-4">
                  <Card className="border-0 prediction-card">
                    <Card.Body>
                      <div className="prediction-header">
                        <h3 className="text-primary mb-4">
                          <i className="fas fa-diagnoses me-2"></i>
                          Predicted Disease: {prediction.predicted_disease}
                        </h3>
      </div>

                      <div className="d-grid gap-3">
                        <Button
                          variant="outline-primary"
                          onClick={() => setShowDescription(!showDescription)}
                          className="info-btn"
                        >
                          <i className={`fas fa-chevron-${showDescription ? 'up' : 'down'} me-2`}></i>
                          {showDescription ? "Hide Description" : "Show Description"}
                        </Button>
                        {showDescription && (
                          <div className="info-content">
                            {prediction.dis_des}
                          </div>
                        )}

                        <Button
                          variant="outline-primary"
                          onClick={() => setShowPrecautions(!showPrecautions)}
                          className="info-btn"
                        >
                          <i className={`fas fa-chevron-${showPrecautions ? 'up' : 'down'} me-2`}></i>
                          {showPrecautions ? "Hide Precautions" : "Show Precautions"}
                        </Button>
                        {showPrecautions && (
                          <div className="info-content">
                            {prediction.my_precautions}
                          </div>
                        )}

                        <Button
                          variant="outline-primary"
                          onClick={() => setShowMedications(!showMedications)}
                          className="info-btn"
                        >
                          <i className={`fas fa-chevron-${showMedications ? 'up' : 'down'} me-2`}></i>
                          {showMedications ? "Hide Medications" : "Show Medications"}
                        </Button>
                        {showMedications && (
                          <div className="info-content">
                            {prediction.medications}
                          </div>
                        )}

                        <Button
                          variant="outline-primary"
                          onClick={() => setShowWorkout(!showWorkout)}
                          className="info-btn"
                        >
                          <i className={`fas fa-chevron-${showWorkout ? 'up' : 'down'} me-2`}></i>
                          {showWorkout ? "Hide Workout" : "Show Workout"}
                        </Button>
                        {showWorkout && (
                          <div className="info-content">
                            {prediction.workout}
                          </div>
                        )}

                        <Button
                          variant="outline-primary"
                          onClick={() => setShowDiet(!showDiet)}
                          className="info-btn"
                        >
                          <i className={`fas fa-chevron-${showDiet ? 'up' : 'down'} me-2`}></i>
                          {showDiet ? "Hide Diet" : "Show Diet"}
                        </Button>
                        {showDiet && (
                          <div className="info-content">
                            {prediction.rec_diet}
            </div>
                        )}
          </div>
                    </Card.Body>
                  </Card>
        </div>
      )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Symptomchk;
