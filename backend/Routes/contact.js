import express from "express";
import Query from "../models/QuerySchema.js";

const router = express.Router();

// POST route for form submission
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    // Save query to database
    const newQuery = new Query({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newQuery.save();

    // Send response with success message
    res.status(200).json({ message: "Message received successfully! We'll get back to you soon." });
  } catch (error) {
    console.error("Error saving query:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// GET route to fetch all queries (admin only)
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch queries" });
  }
});

// PUT route to update query status and response (admin only)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, adminResponse } = req.body;

  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      {
        status,
        adminResponse,
        respondedAt: status === "responded" ? new Date() : undefined,
      },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: "Failed to update query" });
  }
});

export default router;
