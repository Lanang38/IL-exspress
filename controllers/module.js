import { query } from "../Database/db.js";

// Tambah data modul
export const createModul = async (req, res) => {
  const { nama_modul, text_module, file, gambar, video, kategori_id } = req.body;

  if (!nama_modul || !kategori_id) {
    return res.status(400).json({ success: false, message: "Fields nama_modul and kategori_id are required." });
  }

  try {
    await query(
      "INSERT INTO modul (nama_modul, text_module, file, gambar, video, kategori_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nama_modul, text_module, file, gambar, video, kategori_id]
    );
    res.status(201).json({ success: true, message: "Modul created successfully." });
  } catch (error) {
    console.error("Error creating modul:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Menampilkan semua data modul
export const getAllModuls = async (req, res) => {
  try {
    const moduls = await query(
      "SELECT modul_id, nama_modul, text_module, file, gambar, video, tanggal_modul, kategori_id FROM modul ORDER BY tanggal_modul DESC"
    );

    if (moduls.length === 0) {
      return res.status(404).json({ success: false, message: "No modules found." });
    }

    res.status(200).json({
      success: true,
      data: moduls,
    });
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Menampilkan data hanya nama dan tanggal dibuat
export const getModulSimple = async (req, res) => {
  try {
    const moduls = await query(
      "SELECT nama_modul, tanggal_modul FROM modul ORDER BY tanggal_modul DESC"
    );

    if (moduls.length === 0) {
      return res.status(404).json({ success: false, message: "No modules found." });
    }

    res.status(200).json({
      success: true,
      data: moduls,
    });
  } catch (error) {
    console.error("Error fetching simple modules:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Edit data modul
export const editModul = async (req, res) => {
  const { modul_id } = req.params;
  const { nama_modul, text_module, file, gambar, video, kategori_id } = req.body;

  try {
    // Periksa apakah modul ada
    const modulExists = await query("SELECT * FROM modul WHERE modul_id = ?", [modul_id]);
    if (modulExists.length === 0) {
      return res.status(404).json({ success: false, message: "Modul not found." });
    }

    // Update data modul
    await query(
      "UPDATE modul SET nama_modul = ?, text_module = ?, file = ?, gambar = ?, video = ?, kategori_id = ? WHERE modul_id = ?",
      [nama_modul, text_module, file, gambar, video, kategori_id, modul_id]
    );
    res.status(200).json({ success: true, message: "Modul updated successfully." });
  } catch (error) {
    console.error("Error updating modul:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Hapus data modul
export const deleteModul = async (req, res) => {
  const { modul_id } = req.params;

  try {
    // Periksa apakah modul ada
    const modulExists = await query("SELECT * FROM modul WHERE modul_id = ?", [modul_id]);
    if (modulExists.length === 0) {
      return res.status(404).json({ success: false, message: "Modul not found." });
    }

    // Hapus data modul
    await query("DELETE FROM modul WHERE modul_id = ?", [modul_id]);
    res.status(200).json({ success: true, message: "Modul deleted successfully." });
  } catch (error) {
    console.error("Error deleting modul:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
