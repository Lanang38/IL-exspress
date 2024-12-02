import { query } from "../Database/db.js";

export const getMobileKategori = async (req, res) => {
    try {
      const kategoris = await query(
        "SELECT kategori_id, nama_kategori, penjelasan, gambar, tanggal_dibuat, email_mentor FROM kategori ORDER BY tanggal_dibuat DESC"
      );
  
      if (kategoris.length === 0) {
        return res.status(404).json({ success: false, message: "No categories found." });
      }
  
      // Pastikan gambar memiliki path lengkap
      const baseUrl = "http://localhost:3000/uploads/kategori/images/";
  
      const result = kategoris.map(kategori => ({
        ...kategori,
        gambar: baseUrl + kategori.gambar,  // Menggabungkan base URL dengan nama gambar
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