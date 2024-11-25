import express from "express";
import {
  tambahMentor,
  editMentorByEmail,
  hapusMentor,
  ambilSemuaMentor,
} from "../controllers/mentor.js";
import { mentorImages } from "../middlewares/multerMentor.js";

const mentorRoutes = express.Router();

// Route untuk menambahkan mentor dengan upload gambar
mentorRoutes.post("/", mentorImages.single("foto_mentor"), tambahMentor);

// Route untuk mengedit data mentor berdasarkan email (dengan gambar opsional)
mentorRoutes.put("/:email_mentor", mentorImages.single("foto_mentor"), editMentorByEmail);

// Route untuk menghapus mentor berdasarkan email
mentorRoutes.delete("/:email_mentor", hapusMentor);

// Route untuk mendapatkan seluruh data mentor
mentorRoutes.get("/", ambilSemuaMentor);

export default mentorRoutes;
