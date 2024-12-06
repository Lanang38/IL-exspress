import { query } from "../Database/db.js";

// Base URL untuk gambar dan icon
const baseUrlImages = "http://localhost:3000/uploads/kategori/images/";
const baseUrlIcons = "http://localhost:3000/uploads/kategori/icons/";

// Menambahkan kategori
export const addKategori = async (req, res) => {
  const { nama_kategori, penjelasan } = req.body;

  // Validasi file gambar dan icon
  if (!req.files || !req.files.gambar || !req.files.icon) {
    return res
      .status(400)
      .json({ success: false, message: "Gambar dan icon kategori is required." });
  }

  const gambar = req.files.gambar ? req.files.gambar[0].filename : null;
  const icon = req.files.icon ? req.files.icon[0].filename : null;

  // Validasi field
  if (!nama_kategori || !penjelasan) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // Simpan ke database
    await query(
      "INSERT INTO kategori (nama_kategori, penjelasan, gambar, icon) VALUES (?, ?, ?, ?)",
      [nama_kategori, penjelasan, gambar, icon]
    );
    res.status(201).json({ success: true, message: "Kategori added successfully." });
  } catch (error) {
    console.error("Error adding kategori:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Menampilkan semua kategori
export const getAllKategori = async (req, res) => {
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

// Menampilkan kategori hanya nama, gambar, dan icon
export const getSimpleKategori = async (req, res) => {
  try {
    const kategoris = await query(
      "SELECT nama_kategori, gambar, icon FROM kategori ORDER BY nama_kategori"
    );

    if (kategoris.length === 0) {
      return res.status(404).json({ success: false, message: "No categories found." });
    }

    // Pastikan gambar dan icon memiliki path lengkap
    const result = kategoris.map(kategori => ({
      ...kategori,
      gambar: baseUrlImages + kategori.gambar,
      icon: baseUrlIcons + kategori.icon,
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

// Menghapus kategori berdasarkan ID
export const deleteKategori = async (req, res) => {
  const { kategori_id } = req.params;

  try {
    // Periksa apakah kategori ada
    const kategoriExists = await query(
      "SELECT * FROM kategori WHERE kategori_id = ?",
      [kategori_id]
    );

    if (kategoriExists.length === 0) {
      return res.status(404).json({ success: false, message: "Kategori not found." });
    }

    // Hapus kategori
    await query("DELETE FROM kategori WHERE kategori_id = ?", [kategori_id]);
    res.status(200).json({ success: true, message: "Kategori deleted successfully." });
  } catch (error) {
    console.error("Error deleting kategori:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
