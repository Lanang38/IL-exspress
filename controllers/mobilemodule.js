import { query } from "../Database/db.js";

const baseUrlImages = "http://localhost:3000/uploads/materi/images/";
const baseUrlFile = "http://localhost:3000/uploads/materi/pdf/";
const baseUrlVideos = "http://localhost:3000/uploads/materi/videos/";

export const getMobileModuls = async (req, res) => {
    try {
    const moduls = await query(
      "SELECT modul_id, nama_modul, text_module, gambar, video, file, tanggal_modul, kategori_id FROM modul ORDER BY tanggal_modul DESC"
    );

    if (moduls.length === 0) {
      return res.status(404).json({ success: false, message: "Tidak ada modul ditemukan." });
    }
    
    const result = moduls.map(modul => ({
      ...modul,
      gambar: modul.gambar ? baseUrlImages + modul.gambar : null,
      video: modul.video ? baseUrlVideos + modul.video : null,
      file: modul.file ? baseUrlFile + modul.file : null
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error saat mengambil modul:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
  };