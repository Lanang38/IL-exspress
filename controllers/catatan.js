import { query } from "../Database/db.js";

// Menambahkan catatan
export const tambahCatatan = async (req, res) => {
  const { isi_catatan } = req.body;
  try {
    const countResult = await query("SELECT COUNT(*) AS total FROM catatan");
    const totalCatatan = countResult[0].total;

    if (totalCatatan >= 3) {
      await query("DELETE FROM catatan ORDER BY tanggal_dibuat ASC LIMIT 1");
    }

    await query("INSERT INTO catatan (isi_catatan) VALUES (?)", [isi_catatan]);

    return res.status(201).json({ msg: "Catatan berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan catatan", error);
    res.status(500).json({ msg: "Gagal menambahkan catatan" });
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



