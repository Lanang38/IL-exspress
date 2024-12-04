import express from "express";
import { home } from "../controllers/home.js";

const homeRoutes = express.Router();

// Endpoint untuk mendapatkan data chart
homeRoutes.get("/", home);

export default homeRoutes;
