import { query } from "../Database/db.js";

// Menambahkan mentor
export const tambahMentor = async (req, res) => {
  const { email_mentor } = req.body;
  try {
    // Periksa apakah email sudah ada
    const existing = await query("SELECT * FROM mentor WHERE email_mentor = ?", [email_mentor]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: "Email sudah terdaftar, gunakan email lain" });
    }
    // Jika tidak ada, tambahkan mentor baru
    await query(
      "INSERT INTO mentor (nama_mentor, email_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
      [req.body.nama_mentor, email_mentor, req.body.telepon_mentor, req.body.kategori_id, req.body.link_zoom, req.body.waktu_mulai, req.body.waktu_selesai]
    );
    res.status(201).json({ msg: "Mentor berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan mentor", error);
    res.status(500).json({ msg: "Gagal menambahkan mentor" });
  }
};


// Mengedit mentor berdasarkan email
export const editMentorByEmail = async (req, res) => {
  const { email_mentor } = req.params;
  const { nama_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai } = req.body;
  try {
    const result = await query(
      "UPDATE mentor SET nama_mentor = ?, telepon_mentor = ?, kategori_id = ?, link_zoom = ?, waktu_mulai = ?, waktu_selesai = ? WHERE email_mentor = ?",
      [nama_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai, email_mentor]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Mentor berhasil diupdate" });
  } catch (error) {
    console.error("Gagal mengupdate mentor", error);
    res.status(500).json({ msg: "Gagal mengupdate mentor" });
  }
};

// Menghapus mentor
export const hapusMentor = async (req, res) => {
  const { email_mentor } = req.params;
  try {
    const result = await query("DELETE FROM mentor WHERE email_mentor = ?", [email_mentor]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Mentor berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus mentor", error);
    res.status(500).json({ msg: "Gagal menghapus mentor" });
  }
};

// Menampilkan seluruh data mentor (hanya nama, email, nomor telepon)
export const ambilSemuaMentor = async (req, res) => {
  try {
    const result = await query("SELECT nama_mentor, email_mentor, telepon_mentor, link_zoom FROM mentor");
    return res.status(200).json({ msg: "Data mentor berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil data mentor", error);
    res.status(500).json({ msg: "Gagal mengambil data mentor" });
  }
};
