import { query } from "../Database/db.js";

// Menambahkan fitur
export const tambahFitur = async (req, res) => {
  const { isi_fitur } = req.body; // Ambil data fitur dari request
  try {
    // Hitung jumlah fitur yang ada
    const countResult = await query("SELECT COUNT(*) AS total FROM fitur");
    const totalFitur = countResult[0].total;

    // Jika sudah ada 2 fitur, hapus fitur terlama
    if (totalFitur >= 2) {
      await query("DELETE FROM fitur ORDER BY tanggal_dibuat ASC LIMIT 1");
    }

    // Tambahkan fitur baru
    await query("INSERT INTO fitur (isi_fitur) VALUES (?)", [isi_fitur]);

    return res.status(201).json({ msg: "Fitur berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan fitur", error);
    res.status(500).json({ msg: "Gagal menambahkan fitur" });
  }
};

// Menghapus fitur
export const hapusFitur = async (req, res) => {
  const { fitur_id } = req.params; // Ambil ID fitur dari URL parameter
  try {
    const result = await query("DELETE FROM fitur WHERE fitur_id = ?", [fitur_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Fitur tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Fitur berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus fitur", error);
    res.status(500).json({ msg: "Gagal menghapus fitur" });
  }
};
