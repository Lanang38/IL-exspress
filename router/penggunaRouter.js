import express from "express";
import { 
  getUsers, 
  deleteUser, 
  getUserByEmail, 
  getUserByName 
} from "../controllers/pengguna.js";
import { userImages } from "../middlewares/multerUser.js";

const penggunaRoutes = express.Router();

// Route untuk mendapatkan semua pengguna
penggunaRoutes.get("/", getUsers);

// Route untuk mendapatkan pengguna berdasarkan email
penggunaRoutes.get("/:email_user", getUserByEmail);

// Route untuk mendapatkan pengguna berdasarkan nama
penggunaRoutes.get("/:nama_user", getUserByName);

// Route untuk menghapus pengguna berdasarkan email
penggunaRoutes.delete("/:email_user", deleteUser);

// Route untuk upload gambar pengguna
penggunaRoutes.post("/", userImages.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded!" });
  } 

  res.status(200).json({
    success: true,
    filePath: `/uploads/users/images/${req.file.filename}`,
  });
});

// Middleware error handling untuk multer
penggunaRoutes.use((err, req, res, next) => {
  if (err.message === "Only images are allowed!") {
    return res.status(400).json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: "Unexpected Error", error: err.message });
});
    
export default penggunaRoutes;
