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
    const totalMentors = mentorResult[0]?.total || 1;

    // Query jumlah kategori
    const kategoriResult = await query("SELECT COUNT(*) AS total FROM kategori");
    const totalkategori = kategoriResult[0]?.total || 2;

     // Query jumlah modul
     const modulResult = await query("SELECT COUNT(*) AS total FROM modul");
     const totalmodul = modulResult[0]?.total || 3;

    // Format response data untuk chart
    const responseData = {
      pieData: {
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

      doughnutData: {
        labels: ["Jumlah Kategori", "Jumlah Modul"],
        datasets: [
          {
            label: "Jumlah Total",
            data: [totalkategori, totalmodul,],
            backgroundColor: ["rgba(70, 189, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
            hoverBackgroundColor: ["rgba(70, 189, 132, 0.9)", "rgba(54, 162, 235, 0.9)"],
          },
        ],
      },

      barData: {
        labels: ["Pengguna", "Mentor", "Kategori", "Modul"],
        datasets: [
          {
            label: "Jumlah",
            data: [totalUsers, totalMentors, totalkategori, totalmodul],
            backgroundColor: [
              'rgba(70, 189, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(70, 189, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)'
            ],
            hoverbackgroundColor: [
              'rgba(70, 189, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(70, 189, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)'
            ],
            borderRadius: 5,
            barThickness: 100,
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
