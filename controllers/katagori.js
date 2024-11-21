import { query } from "../Database/db.js";

// Menambahkan kategori
export const addKategori = async (req, res) => {
  const { nama_kategori, penjelasan, gambar } = req.body;

  if (!nama_kategori || !penjelasan || !gambar) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    await query(
      "INSERT INTO kategori (nama_kategori, penjelasan, gambar) VALUES (?, ?, ?)",
      [nama_kategori, penjelasan, gambar]
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
      "SELECT kategori_id, nama_kategori, penjelasan, gambar, tanggal_dibuat, email_mentor FROM kategori ORDER BY tanggal_dibuat DESC"
    );

    if (kategoris.length === 0) {
      return res.status(404).json({ success: false, message: "No categories found." });
    }

    res.status(200).json({
      success: true,
      data: kategoris,
    });
  } catch (error) {
    console.error("Error fetching kategori:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Menampilkan kategori hanya nama dan gambar
export const getSimpleKategori = async (req, res) => {
  try {
    const kategoris = await query(
      "SELECT nama_kategori, gambar FROM kategori ORDER BY nama_kategori"
    );

    if (kategoris.length === 0) {
      return res.status(404).json({ success: false, message: "No categories found." });
    }

    res.status(200).json({
      success: true,
      data: kategoris,
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
