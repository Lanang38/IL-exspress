import { query } from "../Database/db.js";

// Tambah Notifikasi
export const tambahNotifikasi = async (req, res) => {
    const { judul_notifikasi, kategori_id, tanggal } = req.body;
    try {
      await query(
        "INSERT INTO notifikasi (judul_notifikasi, kategori_id, tanggal) VALUES (?, ?, ?)",
        [judul_notifikasi, kategori_id, tanggal]
      );
      return res.status(201).json({ msg: "Notifikasi berhasil ditambahkan" });
    } catch (error) {
      console.error("Gagal menambahkan notifikasi", error);
      res.status(500).json({ msg: "Gagal menambahkan notifikasi" });
    }
  };
  
  // Ambil Semua Notifikasi
  export const ambilSemuaNotifikasi = async (req, res) => {
    try {
      const result = await query(`
        SELECT 
          n.notifikasi_id, 
          n.judul_notifikasi, 
          n.tanggal, 
          k.nama_kategori, 
          m.nama_mentor, 
          m.waktu_mulai, 
          m.waktu_selesai
        FROM notifikasi n
        JOIN kategori k ON n.kategori_id = k.kategori_id
        JOIN mentor m ON k.kategori_id = m.kategori_id
      `);
      return res.status(200).json({ msg: "Data notifikasi berhasil diambil", data: result });
    } catch (error) {
      console.error("Gagal mengambil notifikasi", error);
      res.status(500).json({ msg: "Gagal mengambil notifikasi" });
    }
  };
  
  // Ambil Notifikasi Berdasarkan ID
  export const ambilNotifikasiById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query(`
        SELECT 
          n.notifikasi_id, 
          n.judul_notifikasi, 
          n.tanggal, 
          k.nama_kategori, 
          m.nama_mentor, 
          m.waktu_mulai, 
          m.waktu_selesai
        FROM notifikasi n
        JOIN kategori k ON n.kategori_id = k.kategori_id
        JOIN mentor m ON k.kategori_id = m.kategori_id
        WHERE n.notifikasi_id = ?
      `, [id]);
      if (result.length === 0) {
        return res.status(404).json({ msg: "Notifikasi tidak ditemukan" });
      }
      return res.status(200).json({ msg: "Data notifikasi berhasil diambil", data: result[0] });
    } catch (error) {
      console.error("Gagal mengambil notifikasi", error);
      res.status(500).json({ msg: "Gagal mengambil notifikasi" });
    }
  };
  
  // Edit Notifikasi
  export const editNotifikasi = async (req, res) => {
    const { id } = req.params;
    const { judul_notifikasi, kategori_id, tanggal } = req.body;
    try {
      const result = await query(
        "UPDATE notifikasi SET judul_notifikasi = ?, kategori_id = ?, tanggal = ? WHERE notifikasi_id = ?",
        [judul_notifikasi, kategori_id, tanggal, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Notifikasi tidak ditemukan" });
      }
      return res.status(200).json({ msg: "Notifikasi berhasil diupdate" });
    } catch (error) {
      console.error("Gagal mengupdate notifikasi", error);
      res.status(500).json({ msg: "Gagal mengupdate notifikasi" });
    }
  };
  
  // Hapus Notifikasi
  export const hapusNotifikasi = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query("DELETE FROM notifikasi WHERE notifikasi_id = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Notifikasi tidak ditemukan" });
      }
      return res.status(200).json({ msg: "Notifikasi berhasil dihapus" });
    } catch (error) {
      console.error("Gagal menghapus notifikasi", error);
      res.status(500).json({ msg: "Gagal menghapus notifikasi" });
    }
  };



export const ambilNotifikasikategori = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT 
        k.kategori_id,
        k.nama_kategori,
        m.nama_mentor,
        m.waktu_mulai,
        m.waktu_selesai
      FROM kategori k
      LEFT JOIN mentor m ON k.kategori_id = m.kategori_id
      `
    );

    return res.status(200).json({
      msg: "Data kategori berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("Gagal mengambil kategori", error);
    return res.status(500).json({
      msg: "Gagal mengambil kategori. Silakan coba lagi nanti.",
    });
  }
};