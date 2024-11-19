import express from "express";
import {
  loginAdmin,
  ambilAdminByEmail,
  ambilSemuaAdmin,
  tambahFotoAdmin,
  updateFotoAdmin,
  hapusFotoAdmin,
  updateAdmin,
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

// Routes untuk admin
adminRoutes.post("/login", loginAdmin);
adminRoutes.get("/admin/email/:email", ambilAdminByEmail);
adminRoutes.get("/admin", ambilSemuaAdmin);
adminRoutes.post("/admin/email/:email/foto", tambahFotoAdmin);
adminRoutes.put("/admin/email/:email/foto", updateFotoAdmin);
adminRoutes.delete("/admin/email/:email/foto", hapusFotoAdmin);
adminRoutes.put("/admin/email/:email", updateAdmin);

export default adminRoutes; // Pastikan diekspor sebagai default
