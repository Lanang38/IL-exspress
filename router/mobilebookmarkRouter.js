import express from "express";
import { addUserCategory, deleteUserByEmail, getUserByEmail } from "../controllers/mobilebookmark.js";

const mobilebookmarkRouter = express.Router();

// Endpoint untuk mendapatkan data chart
mobilebookmarkRouter.get("/:email_user", getUserByEmail);
mobilebookmarkRouter.delete("/:email_user", deleteUserByEmail);
mobilebookmarkRouter.post("/", addUserCategory);

export default mobilebookmarkRouter;