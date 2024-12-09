import { query } from "../Database/db.js";

// Base URL untuk gambar
const baseUrlImages = "http://localhost:3000/uploads/kategori/images/";

export const addUserCategory = async (req, res) => {
  const { email_user, kategori_id } = req.body;

  if (!email_user || !kategori_id) {
    return res.status(400).json({ success: false, message: "email_user and kategori_id are required" });
  }

  try {
    const result = await query("INSERT INTO your_table_name (email_user, kategori_id) VALUES (?, ?)", [email_user, kategori_id]);
    res.status(201).json({
      success: true,
      message: "Data successfully added",
      data: { id: result.insertId, email_user, kategori_id },
    });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const deleteUserByEmail = async (req, res) => {
  const { email_user } = req.params;

  if (!email_user) {
    return res.status(400).json({ success: false, message: "email_user is required" });
  }

  try {
    const result = await query("DELETE FROM your_table_name WHERE email_user = ?", [email_user]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "No data found for the provided email_user" });
    }

    res.status(200).json({
      success: true,
      message: "Data successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email_user } = req.params;

  if (!email_user) {
    return res.status(400).json({ success: false, message: "email_user is required" });
  }

  try {
    // Query untuk mendapatkan data user beserta kategori
    const result = await query(
      `SELECT 
        u.email_user, 
        k.kategori_id, 
        k.nama_kategori, 
        k.penjelasan, 
        CONCAT('${baseUrlImages}', k.gambar) AS gambar 
       FROM your_table_name u 
       JOIN kategori k ON u.kategori_id = k.kategori_id 
       WHERE u.email_user = ?`,
      [email_user]
    );

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "No data found for the provided email_user" });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
