import { query } from "../Database/db.js";

// Get all users
export const getUsers = async (req, res) => {
  const { nama_user, email_user } = req.query;

  try {
    let sql = "SELECT email_user, nama_user, telpon_user, tgl_pendaftaran FROM pengguna WHERE 1=1";
    const params = [];

    if (nama_user) {
      sql += " AND nama_user LIKE ?";
      params.push(`%${nama_user}%`);
    }

    if (email_user) {
      sql += " AND email_user LIKE ?";
      params.push(`%${email_user}%`);
    }

    const users = await query(sql, params);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found." });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
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


// Delete a user by email
export const deleteUser = async (req, res) => {
  const { email_user } = req.params;

  try {
    const userExists = await query("SELECT * FROM pengguna WHERE email_user = ?", [email_user]);
    if (userExists.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await query("DELETE FROM pengguna WHERE email_user = ?", [email_user]);
    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

