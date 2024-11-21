import { query } from "../Database/db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    // Query untuk mendapatkan semua data pengguna
    const users = await query(
      "SELECT email_user, nama_user, telpon_user, foto_profile FROM pengguna ORDER BY email_user"
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

