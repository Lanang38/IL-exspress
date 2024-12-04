import { query } from "../Database/db.js";

/**
 * Controller untuk mendapatkan data dashboard
 */
export const home = async (req, res) => {
  try {
    // Query jumlah pengguna
    const hasilpengguna = await query("SELECT COUNT(*) AS total FROM pengguna");
    const totalpengguna = hasilpengguna[0]?.total || 0;

    // Query jumlah mentor
    const hasilmentor = await query("SELECT COUNT(*) AS total FROM mentor");
    const totalMentor = hasilmentor[0]?.total || 1;

    // Query jumlah kategori
    const hasilkategori = await query("SELECT COUNT(*) AS total FROM kategori");
    const totalkategori = hasilkategori[0]?.total || 2;

    // Query jumlah modul
    const hasilmodul = await query("SELECT COUNT(*) AS total FROM modul");
    const totalmodul = hasilmodul[0]?.total || 3;

    // Query data mentor
    const hasilMentorData = await query(`
      SELECT 
        nama_mentor, 
        link_zoom, 
        waktu_mulai, 
        waktu_selesai 
      FROM mentor
    `);
    const mentorData = hasilMentorData.map((mentor) => ({
      name: mentor.nama_mentor,
      zoomLink: mentor.link_zoom,
      startTime: mentor.waktu_mulai,
      endTime: mentor.waktu_selesai,
    }));

    // Format response data untuk chart dan mentor
    const responseData = {
      pieData: {
        labels: ["Jumlah Pengguna", "Jumlah Mentor"],
        datasets: [
          {
            label: "Jumlah Total",
            data: [totalpengguna, totalMentor],
            backgroundColor: ["rgba(70, 189, 132, 0.7)", "rgba(221, 56, 56, 0.7)"],
            hoverBackgroundColor: ["rgba(70, 189, 132, 0.9)", "rgba(221, 56, 56, 0.9)"],
          },
        ],
      },
      doughnutData: {
        labels: ["Jumlah Kategori", "Jumlah Modul"],
        datasets: [
          {
            label: "Jumlah Total",
            data: [totalkategori, totalmodul],
            backgroundColor: ["rgba(70, 189, 132, 0.7)", "rgba(221, 56, 56, 0.7)"],
            hoverBackgroundColor: ["rgba(70, 189, 132, 0.9)", "rgba(221, 56, 56, 0.9)"],
          },
        ],
      },
      mentorData, // Tambahkan data mentor
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
