import { query } from "../Database/db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    // Query untuk mendapatkan semua data pengguna
    const users = await query(
      "SELECT email_user, nama_user, telpon_user, tgl_pendaftaran FROM pengguna ORDER BY email_user"
    );

    // Jika tidak ada data
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found." });
    }

    // Jika data ditemukan
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// Get a user by email
export const getUserByEmail = async (req, res) => {
  const { email_user } = req.params; // Mendapatkan email dari parameter

  try {
    // Query untuk mencari pengguna berdasarkan email
    const user = await query(
      "SELECT email_user, nama_user, telpon_user, tgl_pendaftaran FROM pengguna WHERE email_user = ?",
      [email_user]
    );

    // Jika pengguna tidak ditemukan
    if (user.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Jika pengguna ditemukan
    res.status(200).json({
      success: true,
      data: user[0], // Ambil data pengguna pertama karena query akan mengembalikan array
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// Get a user by name
export const getUserByName = async (req, res) => {
  const { nama_user } = req.params; // Mendapatkan nama dari parameter

  try {
    // Query untuk mencari pengguna berdasarkan nama
    const users = await query(
      "SELECT email_user, nama_user, telpon_user, tgl_pendaftaran FROM pengguna WHERE nama_user = ?",
      [nama_user]
    );

    // Jika pengguna tidak ditemukan
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Jika pengguna ditemukan
    res.status(200).json({
      success: true,
      data: users, // Bisa mengembalikan lebih dari satu hasil
    });
  } catch (error) {
    console.error("Error fetching user by name:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { email_user } = req.params; // Email sebagai parameter

  try {
    // Periksa apakah pengguna ada
    const userExists = await query("SELECT * FROM pengguna WHERE email_user = ?", [email_user]);
    if (userExists.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hapus pengguna
    await query("DELETE FROM pengguna WHERE email_user = ?", [email_user]);
    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

