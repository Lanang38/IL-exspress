import express from "express";
import { getMobileModuls } from "../controllers/mobilemodule.js";

const mobilemoduleRouter = express.Router();

// Route untuk mengambil data notifikasi, kategori, dan mentor
mobilemoduleRouter.get("/", getMobileModuls);

export default mobilemoduleRouter;