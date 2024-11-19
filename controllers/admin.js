import { query } from "../Database/db";

// Login menggunakan email dan password
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query("SELECT * FROM admin WHERE email_admin = ? AND password = ?", [email, password]);
    if (result.length === 0) {
      return res.status(401).json({ msg: "Login gagal, email atau password salah" });
    }
    return res.status(200).json({ msg: "Login berhasil", data: result[0] });
  } catch (error) {
    console.error("Login gagal", error);
    res.status(500).json({ msg: "Login gagal" });
  }
};

// Menampilkan data admin berdasarkan email
export const ambilAdminByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await query("SELECT * FROM admin WHERE email_admin = ?", [email]);
    if (result.length === 0) {
      return res.status(404).json({ msg: "Admin tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Data admin berhasil diambil", data: result[0] });
  } catch (error) {
    console.error("Gagal mengambil data admin", error);
    res.status(500).json({ msg: "Gagal mengambil data admin" });
  }
};

// Menampilkan seluruh data admin (foto, nama_panggilan, email, nomor telepon)
export const ambilSemuaAdmin = async (req, res) => {
  try {
    const result = await query("SELECT foto_pr, nama_panggilan_admin, email_admin, telepon_admin FROM admin");
    return res.status(200).json({ msg: "Data admin berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil semua data admin", error);
    res.status(500).json({ msg: "Gagal mengambil semua data admin" });
  }
};

// Menambah foto admin
export const tambahFotoAdmin = async (req, res) => {
  const { email } = req.params;
  const { foto } = req.body;
  try {
    await query("UPDATE admin SET foto_pr = ? WHERE email_admin = ?", [foto, email]);
    return res.status(200).json({ msg: "Foto berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambah foto", error);
    res.status(500).json({ msg: "Gagal menambah foto" });
  }
};

// Mengupdate foto admin
export const updateFotoAdmin = async (req, res) => {
  const { email } = req.params;
  const { foto } = req.body;
  try {
    await query("UPDATE admin SET foto_pr = ? WHERE email_admin = ?", [foto, email]);
    return res.status(200).json({ msg: "Foto berhasil diupdate" });
  } catch (error) {
    console.error("Gagal mengupdate foto", error);
    res.status(500).json({ msg: "Gagal mengupdate foto" });
  }
};

// Menghapus foto admin
export const hapusFotoAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    await query("UPDATE admin SET foto_pr = NULL WHERE email_admin = ?", [email]);
    return res.status(200).json({ msg: "Foto berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus foto", error);
    res.status(500).json({ msg: "Gagal menghapus foto" });
  }
};

// Mengupdate data admin
export const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const { nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat } = req.body;
  try {
    await query(
      "UPDATE admin SET nama_admin = ?, nama_panggilan_admin = ?, tanggal_lahir = ?, tempat_lahir = ?, telepon_admin = ?, alamat = ? WHERE email_admin = ?",
      [nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat, email]
    );
    return res.status(200).json({ msg: "Data admin berhasil diupdate" });
  } catch (error) {
    console.error("Gagal mengupdate data admin", error);
    res.status(500).json({ msg: "Gagal mengupdate data admin" });
  }
};
