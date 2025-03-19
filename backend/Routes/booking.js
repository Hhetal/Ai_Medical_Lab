import express from "express";
import { authenticate } from "./../auth/verifyToken.js";
import { getCheckoutSession, getMyAppointments } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
router.get("/my-appointments", authenticate, getMyAppointments);

export default router;


