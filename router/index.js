import express from 'express';
import adminRoutes from './adminRouter.js';
import catatanRoutes from './catatanRouter.js';
import fiturRoutes from './fiturRouter.js';
import mentorRoutes from './mentorRouter.js';
import notificationRoutes from './notificationRouter.js';
import penggunaRoutes from './penggunaRouter.js';
import kategoriRoutes from './katagoriRouter.js';
import modulRoutes from './moduleRouter.js';
import laporanRoutes from './laporanRouter.js'

const router = express.Router();

// Gabungkan semua route
router.use('/admin', adminRoutes);
router.use('/catatan', catatanRoutes);
router.use('/fitur', fiturRoutes);
router.use('/mentor', mentorRoutes);
router.use('/notifikasi', notificationRoutes);
router.use('/pengguna', penggunaRoutes);
router.use('/kategori', kategoriRoutes);
router.use('/modul', modulRoutes);
router.use('/laporan', laporanRoutes);

export default router;
