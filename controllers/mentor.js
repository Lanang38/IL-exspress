import { query } from "../Database/db.js";

// Menambahkan mentor
export const tambahMentor = async (req, res) => {
  const { nama_mentor, email_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai } = req.body;

  // Validasi input
  if (!nama_mentor || !email_mentor || !kategori_id || !waktu_mulai || !waktu_selesai) {
    return res.status(400).json({ msg: "Harap isi semua field yang diperlukan" });
  }

  const foto_mentor = req.file ? req.file.path : null; // Dapatkan path gambar jika ada

  try {
    // Periksa apakah email sudah ada
    const existing = await query("SELECT * FROM mentor WHERE email_mentor = ?", [email_mentor]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: "Email sudah terdaftar, gunakan email lain" });
    }

    // Tambahkan mentor baru
    await query(
      "INSERT INTO mentor (nama_mentor, email_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai, foto_mentor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nama_mentor, email_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai, foto_mentor]
    );

    // Update kolom email_mentor di tabel kategori
    await query("UPDATE kategori SET email_mentor = ? WHERE kategori_id = ?", [email_mentor, kategori_id]);

    res.status(201).json({ msg: "Mentor berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan mentor:", error.message);
    res.status(500).json({ msg: "Gagal menambahkan mentor" });
  }
};

// Mengedit mentor berdasarkan email
export const editMentorByEmail = async (req, res) => {
  const { email_mentor } = req.params;
  const { nama_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai } = req.body;

  if (!email_mentor) {
    return res.status(400).json({ msg: "Email mentor diperlukan untuk mengedit data" });
  }

  const foto_mentor = req.file ? req.file.path : null; // Dapatkan path gambar baru jika ada

  try {
    // Dapatkan data mentor yang ada
    const existing = await query("SELECT * FROM mentor WHERE email_mentor = ?", [email_mentor]);
    if (existing.length === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }

    const kategori_lama_id = existing[0].kategori_id; // Dapatkan kategori lama dari mentor

    // Perbarui data mentor
    const result = await query(
      "UPDATE mentor SET nama_mentor = ?, telepon_mentor = ?, kategori_id = ?, link_zoom = ?, waktu_mulai = ?, waktu_selesai = ?, foto_mentor = ? WHERE email_mentor = ?",
      [nama_mentor, telepon_mentor, kategori_id, link_zoom, waktu_mulai, waktu_selesai, foto_mentor || existing[0].foto_mentor, email_mentor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }

    // Kosongkan kolom email_mentor di kategori lama, jika mentor pindah kategori
    if (kategori_id !== kategori_lama_id) {
      await query("UPDATE kategori SET email_mentor = NULL WHERE kategori_id = ?", [kategori_lama_id]);
    }

    // Update kolom email_mentor di kategori baru
    await query("UPDATE kategori SET email_mentor = ? WHERE kategori_id = ?", [email_mentor, kategori_id]);

    res.status(200).json({ msg: "Mentor berhasil diupdate" });
  } catch (error) {
    console.error("Gagal mengupdate mentor:", error.message);
    res.status(500).json({ msg: "Gagal mengupdate mentor" });
  }
};

// Menghapus mentor
export const hapusMentor = async (req, res) => {
  const { email_mentor } = req.params;

  if (!email_mentor) {
    return res.status(400).json({ msg: "Email mentor diperlukan untuk menghapus data" });
  }

  try {
    // Periksa apakah mentor ada
    const mentor = await query("SELECT * FROM mentor WHERE email_mentor = ?", [email_mentor]);
    if (mentor.length === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }

    // Hapus mentor
    const result = await query("DELETE FROM mentor WHERE email_mentor = ?", [email_mentor]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Mentor tidak ditemukan" });
    }

    res.status(200).json({ msg: "Mentor berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus mentor:", error.message);
    res.status(500).json({ msg: "Gagal menghapus mentor" });
  }
};
// Menampilkan seluruh data mentor
export const ambilSemuaMentor = async (req, res) => {
  try {
    const result = await query("SELECT nama_mentor, email_mentor, telepon_mentor, link_zoom, foto_mentor FROM mentor");
    res.status(200).json({ msg: "Data mentor berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil data mentor:", error.message);
    res.status(500).json({ msg: "Gagal mengambil data mentor" });
  }
};
