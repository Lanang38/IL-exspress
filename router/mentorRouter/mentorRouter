import express from "express";
import {
  tambahMentor,
  editMentorByEmail,
  hapusMentor,
  ambilSemuaMentor,
} from "../controllers/mentor.js";

const mentorRoutes = express.Router();

// Routes untuk mentor
mentorRoutes.post("/mentor", tambahMentor);
mentorRoutes.put("/mentor/email/:email_mentor", editMentorByEmail);
mentorRoutes.delete("/mentor/email/:email_mentor", hapusMentor);
mentorRoutes.get("/mentor", ambilSemuaMentor);

export default mentorRoutes;
