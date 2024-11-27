import express from "express";
import { pengguna } from "../controllers/laporan.js";

const laporanRoutes = express.Router();

// Endpoint untuk mendapatkan data chart
laporanRoutes.get("/chart", pengguna);

export default laporanRoutes;
