import express from "express";
import { getUsers, deleteUser } from "../controllers/pengguna.js";

const penggunaRoutes = express.Router();

// Route to get users with pagination
penggunaRoutes.get("/", getUsers);

// Route to delete a user by ID
penggunaRoutes.delete("/:email_user", deleteUser);

export default penggunaRoutes;
