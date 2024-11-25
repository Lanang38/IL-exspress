import { query } from "../Database/db.js";

// Tambah Catatan
export const tambahCatatan = async (req, res) => {
  const { isi_catatan } = req.body;
  try {
    const countResult = await query("SELECT COUNT(*) AS total FROM catatan");
    if (countResult[0].total >= 4) {
      await query("DELETE FROM catatan ORDER BY tanggal_dibuat ASC LIMIT 1");
    }
    await query("INSERT INTO catatan (isi_catatan) VALUES (?)", [isi_catatan]);
    res.status(201).json({ msg: "Catatan berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan catatan", error);
    res.status(500).json({ msg: "Gagal menambahkan catatan" });
  }
};

// Hapus Catatan
export const hapusCatatan = async (req, res) => {
  const { catatan_id } = req.params;
  try {
    const result = await query("DELETE FROM catatan WHERE catatan_id = ?", [catatan_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Catatan tidak ditemukan" });
    }
    res.status(200).json({ msg: "Catatan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus catatan", error);
    res.status(500).json({ msg: "Gagal menghapus catatan" });
  }
};

// Get Catatan
export const getCatatan = async (req, res) => {
  try {
    const notes = await query("SELECT catatan_id, isi_catatan FROM catatan ORDER BY tanggal_dibuat DESC");
    res.status(200).json(notes);
  } catch (error) {
    console.error("Gagal mendapatkan catatan", error);
    res.status(500).json({ msg: "Gagal mendapatkan catatan" });
  }
};



