import { query } from "../Database/db.js";


// Tambah data modul
export const createModul = async (req, res) => {
  const { nama_modul, text_module, kategori_id } = req.body;
  const file = req.file ? req.file.path : null;
  const gambar = req.body.gambar || null;
  const video = req.body.video || null;

  if (!nama_modul || !kategori_id) {
    return res.status(400).json({ success: false, message: "Field nama_modul dan kategori_id wajib diisi." });
  }

  try {
    await query(
      "INSERT INTO modul (nama_modul, text_module, file, gambar, video, kategori_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nama_modul, text_module, file, gambar, video, kategori_id]
    );
    res.status(201).json({ success: true, message: "Modul berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat modul:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
};

// Menampilkan semua data modul
export const getAllModuls = async (req, res) => {
  try {
    const moduls = await query(
      "SELECT modul_id, nama_modul, text_module, file, gambar, video, tanggal_modul, kategori_id FROM modul ORDER BY tanggal_modul DESC"
    );

    if (moduls.length === 0) {
      return res.status(404).json({ success: false, message: "Tidak ada modul ditemukan." });
    }

    res.status(200).json({
      success: true,
      data: moduls,
    });
  } catch (error) {
    console.error("Error saat mengambil modul:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
};

// Menampilkan data modul hanya nama dan tanggal dibuat
export const getModulSimple = async (req, res) => {
  try {
    const moduls = await query(
      "SELECT nama_modul, tanggal_modul FROM modul ORDER BY tanggal_modul DESC"
    );

    if (moduls.length === 0) {
      return res.status(404).json({ success: false, message: "Tidak ada modul ditemukan." });
    }

    res.status(200).json({
      success: true,
      data: moduls,
    });
  } catch (error) {
    console.error("Error saat mengambil modul sederhana:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
};

// Edit data modul
export const editModul = async (req, res) => {
  const { modul_id } = req.params;
  const { nama_modul, text_module, kategori_id } = req.body;
  const file = req.file ? req.file.path : null;  // Menangani unggahan file
  const gambar = req.body.gambar || null; // Mengasumsikan gambar ditangani di field lain
  const video = req.body.video || null; // Mengasumsikan video ditangani di field lain

  try {
    // Periksa apakah modul ada di database
    const modulExists = await query("SELECT * FROM modul WHERE modul_id = ?", [modul_id]);
    if (modulExists.length === 0) {
      return res.status(404).json({ success: false, message: "Modul tidak ditemukan." });
    }

    // Memperbarui data modul
    await query(
      "UPDATE modul SET nama_modul = ?, text_module = ?, file = ?, gambar = ?, video = ?, kategori_id = ? WHERE modul_id = ?",
      [nama_modul, text_module, file, gambar, video, kategori_id, modul_id]
    );
    res.status(200).json({ success: true, message: "Modul berhasil diperbarui." });
  } catch (error) {
    console.error("Error saat memperbarui modul:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
};

// Hapus data modul
export const deleteModul = async (req, res) => {
  const { modul_id } = req.params;

  try {
    // Periksa apakah modul ada
    const modulExists = await query("SELECT * FROM modul WHERE modul_id = ?", [modul_id]);
    if (modulExists.length === 0) {
      return res.status(404).json({ success: false, message: "Modul tidak ditemukan." });
    }

    // Hapus data modul
    await query("DELETE FROM modul WHERE modul_id = ?", [modul_id]);
    res.status(200).json({ success: true, message: "Modul berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus modul:", error);
    res.status(500).json({ success: false, message: "Kesalahan Server", error });
  }
};
