import express from "express";
import { predictDisease } from "../Controllers/symptomsController.js";

const router = express.Router();

router.post("/", predictDisease);

export default router; 