import { query } from "../Database/db.js";

// Base URL untuk gambar dan icon
const baseUrlImages = "http://localhost:3000/uploads/kategori/images/";
const baseUrlIcons = "http://localhost:3000/uploads/kategori/icons/";

export const getMobileKategori = async (req, res) => {
  try {
    const kategoris = await query(
      "SELECT kategori_id, nama_kategori, penjelasan, gambar, icon, tanggal_dibuat FROM kategori ORDER BY tanggal_dibuat DESC"
    );

    if (kategoris.length === 0) {
      return res.status(404).json({ success: false, message: "No categories found." });
    }

    // Pastikan gambar dan icon memiliki path lengkap
    const result = kategoris.map(kategori => ({
      ...kategori,
      gambar: baseUrlImages + kategori.gambar, // Menggabungkan base URL dengan nama gambar
      icon: baseUrlIcons + kategori.icon,     // Menggabungkan base URL dengan nama icon
    }));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching kategori:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
  };