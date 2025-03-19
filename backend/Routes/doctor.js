import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

// Get doctor's profile
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

// Public routes
router.get("/", getAllDoctors); // Fetch all Doctors
router.get("/:id", getSingleDoctor); // Fetch a single Doctor

// Protected routes
router.delete("/:id", authenticate, restrict(["doctor", "admin"]), deleteDoctor);
router.put("/:id", authenticate, restrict(["doctor", "admin"]), updateDoctor);

export default router;
