import { query } from "../Database/db.js";

// Tambah Fitur
export const tambahFitur = async (req, res) => {
  const { isi_fitur } = req.body; // Ambil isi_fitur dari request body
  try {
    const countResult = await query("SELECT COUNT(*) AS total FROM fitur");
    const totalFitur = countResult[0]?.total || 0;

    // Jika sudah ada 2 fitur, hapus fitur terlama
    if (totalFitur >= 3) {
      await query("DELETE FROM fitur ORDER BY tanggal_dibuat ASC LIMIT 1");
    }

    // Tambahkan fitur baru
    const insertResult = await query("INSERT INTO fitur (isi_fitur) VALUES (?)", [isi_fitur]);
    res.status(201).json({ msg: "Fitur berhasil ditambahkan", id: insertResult.insertId });
  } catch (error) {
    console.error("Gagal menambahkan fitur", error);
    res.status(500).json({ msg: "Gagal menambahkan fitur" });
  }
};

// Hapus Fitur
export const hapusFitur = async (req, res) => {
  const { fitur_id } = req.params; // Ambil ID fitur dari URL parameter
  try {
    const result = await query("DELETE FROM fitur WHERE fitur_id = ?", [fitur_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Fitur tidak ditemukan" });
    }
    res.status(200).json({ msg: "Fitur berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus fitur", error);
    res.status(500).json({ msg: "Gagal menghapus fitur" });
  }
};

// Get Fitur
export const getFitur = async (req, res) => {
  try {
    const features = await query("SELECT fitur_id, isi_fitur FROM fitur ORDER BY tanggal_dibuat DESC");
    res.status(200).json(features);
  } catch (error) {
    console.error("Gagal mendapatkan fitur", error);
    res.status(500).json({ msg: "Gagal mendapatkan fitur" });
  }
};
