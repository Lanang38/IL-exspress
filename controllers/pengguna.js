import { query } from "../Database/db";

// Get paginated users
export const getUsers = async (req, res) => {
  const { page = 1, limit = 8 } = req.query; // Default page = 1, limit = 8
  const offset = (page - 1) * limit;

  try {
    // Query to get total users
    const totalResult = await query("SELECT COUNT(*) AS total FROM users");
    const totalUsers = totalResult[0].total;

    // Query to get paginated users
    const users = await query(
      "SELECT id, name, email, phone, date FROM users ORDER BY id LIMIT ? OFFSET ?",
      [parseInt(limit), offset]
    );

    res.status(200).json({
      success: true,
      data: users,
      total: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const userExists = await query("SELECT * FROM users WHERE id = ?", [id]);
    if (userExists.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Delete the user
    await query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
