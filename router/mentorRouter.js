import express from "express";
import {
  tambahMentor,
  editMentorByEmail,
  hapusMentor,
  ambilSemuaMentor,
} from "../controllers/mentor.js";

const mentorRoutes = express.Router();

// Routes untuk mentor
mentorRoutes.post("/", tambahMentor);
mentorRoutes.put("/:email_mentor", editMentorByEmail);
mentorRoutes.delete("/:email_mentor", hapusMentor);
mentorRoutes.get("/", ambilSemuaMentor);

export default mentorRoutes;
