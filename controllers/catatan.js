import { query } from "../Database/db.js";

// Menambahkan catatan
export const tambahCatatan = async (req, res) => {
  const { isi_catatan } = req.body; // Ambil data fitur dari request
  try {
    // Hitung jumlah fitur yang ada
    const countResult = await query("SELECT COUNT(*) AS total FROM catatan");
    const totalFitur = countResult[0].total;

    // Jika sudah ada 2 fitur, hapus fitur terlama
    if (totalFitur >= 4) {
      await query("DELETE FROM catatan ORDER BY tanggal_dibuat ASC LIMIT 1");
    }

    // Tambahkan fitur baru
    await query("INSERT INTO catatan (isi_catatan) VALUES (?)", [isi_catatan]);

    return res.status(201).json({ msg: "Catatan berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan citur", error);
    res.status(500).json({ msg: "Gagal menambahkan Catatan" });
  }
};


// Menghapus catatan
export const hapusCatatan = async (req, res) => {
  const { catatan_id } = req.params;
  
  // Debug log untuk memeriksa catatan_id
  console.log("Catatan ID yang diterima:", catatan_id);

  try {
    const result = await query("DELETE FROM catatan WHERE catatan_id = ?", [catatan_id]);
    console.log("Hasil DELETE:", result);  // Debug hasil query DELETE
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Catatan tidak ditemukan" });
    }
    
    return res.status(200).json({ msg: "Catatan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus catatan", error);
    res.status(500).json({ msg: "Gagal menghapus catatan" });
  }
};

export const getCatatan = async (req, res) => {
  try {
    const fitur = await query("SELECT isi_catatan FROM catatan ORDER BY tanggal_dibuat DESC"); // Hanya mengambil kolom isi_fitur
    return res.status(200).json(fitur);
  } catch (error) {
    console.error("Gagal mendapatkan fitur", error);
    res.status(500).json({ msg: "Gagal mendapatkan fitur" });
  }
};



