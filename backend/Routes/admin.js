import express from "express";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import {
  getAllUsers,
  getAllDoctors,
  getAllBookings,
  deleteUserById,
  deleteDoctorById,
  updateDoctorApprovalStatus,
} from "../Controllers/adminController.js";

const router = express.Router();

// Apply authentication and admin role restriction to all admin routes
router.use(authenticate, restrict(["admin"]));

router.route("/users").get(getAllUsers);
router.route("/doctors").get(getAllDoctors);
router.route("/bookings").get(getAllBookings);

router.route("/users/delete/:id").delete(deleteUserById);
router.route("/doctors/delete/:id").delete(deleteDoctorById);
router.route("/doctors/:id").put(updateDoctorApprovalStatus);

export default router;
