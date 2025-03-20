import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  getAllUsers,
  getAllDoctors,
  getAllBookings,
  deleteUserById,
  deleteDoctorById,
  updateDoctorApprovalStatus,
  updateDoctorDetails,
  getUserById,
  updateUserById,
  getDoctorById,
  updateDoctorById,
} from "../Controllers/adminController.js";

const router = express.Router();

// User routes
router.get("/users", authenticate, restrict(["admin"]), getAllUsers);
router.get("/users/:id", authenticate, restrict(["admin"]), getUserById);
router.put("/users/:id", authenticate, restrict(["admin"]), updateUserById);
router.delete("/users/:id", authenticate, restrict(["admin"]), deleteUserById);

// Doctor routes
router.get("/doctors", authenticate, restrict(["admin"]), getAllDoctors);
router.get("/doctors/:id", authenticate, restrict(["admin"]), getDoctorById);
router.put("/doctors/:id", authenticate, restrict(["admin"]), updateDoctorById);
router.put("/doctors/:id/approval", authenticate, restrict(["admin"]), updateDoctorApprovalStatus);
router.delete("/doctors/:id", authenticate, restrict(["admin"]), deleteDoctorById);

// Booking routes
router.get("/bookings", authenticate, restrict(["admin"]), getAllBookings);

export default router;
