import { query } from "../Database/db.js";

/**
 * Controller untuk mendapatkan jumlah total pengguna dan mentor
 */
export const pengguna = async (req, res) => {
  try {
    // Query jumlah pengguna
    const penggunaResult = await query("SELECT COUNT(*) AS total FROM pengguna");
    const totalUsers = penggunaResult[0]?.total || 0;

    // Query jumlah mentor
    const mentorResult = await query("SELECT COUNT(*) AS total FROM mentor");
    const totalMentors = mentorResult[0]?.total || 0;

    // Format response data untuk chart
    const responseData = {
      doughnutData: {
        labels: ["Jumlah Pengguna", "Jumlah Mentor"],
        datasets: [
          {
            label: "Jumlah Total",
            data: [totalUsers, totalMentors],
            backgroundColor: ["rgba(70, 189, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
            hoverBackgroundColor: ["rgba(70, 189, 132, 0.9)", "rgba(54, 162, 235, 0.9)"],
          },
        ],
      },
      barData: {
        labels: ["Pengguna", "Mentor"],
        datasets: [
          {
            label: "Jumlah",
            data: [totalUsers, totalMentors],
            backgroundColor: ["rgba(70, 189, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
            borderRadius: 5,
            barThickness: 30,
          },
        ],
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
