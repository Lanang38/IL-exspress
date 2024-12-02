import { query } from "../Database/db.js";

// Mengambil data dari tabel notifikasi, kategori, dan mentor
export const ambilNotifikasiKategoriMentor = async (req, res) => {
  try {
    // Query untuk menggabungkan tabel notifikasi, kategori, dan mentor
    const result = await query(`
      SELECT 
        n.*,
        k.nama_kategori,
        m.nama_mentor,
        m.link_zoom,
        m.waktu_mulai,
        m.waktu_selesai,
        TIMEDIFF(m.waktu_selesai, m.waktu_mulai) AS durasi
      FROM 
        notifikasi n
      JOIN 
        kategori k ON n.kategori_id = k.kategori_id
      LEFT JOIN 
        mentor m ON k.kategori_id = m.kategori_id;
    `);

    // Mengembalikan hasil dalam format JSON
    res.status(200).json({
      msg: "Data notifikasi, kategori, dan mentor berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
    res.status(500).json({ msg: "Gagal mengambil data" });
  }
};
