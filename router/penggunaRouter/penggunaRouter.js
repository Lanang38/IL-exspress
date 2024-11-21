import express from "express";
import { getUsers, deleteUser } from "../controllers/pengguna.js";

const penggunaRoutes = express.Router();

// Route to get users with pagination
router.get("/pengguna", getUsers);

// Route to delete a user by ID
router.delete("/pengguna/:id_pengguna", deleteUser);

export default penggunaRoutes;
