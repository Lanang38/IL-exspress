import { query } from "../Database/db.js";

export const getMobileModuls = async (req, res) => {
    try {
      const moduls = await query(
        "SELECT modul_id, nama_modul, text_module, gambar, video, file, tanggal_modul, kategori_id FROM modul ORDER BY tanggal_modul DESC"
      );
  
      if (moduls.length === 0) {
        return res.status(404).json({ success: false, message: "Tidak ada modul ditemukan." });
      }
  
      res.status(200).json({ success: true, data: moduls });
    } catch (error) {
      console.error("Error saat mengambil modul:", error);
      res.status(500).json({ success: false, message: "Kesalahan Server", error });
    }
  };