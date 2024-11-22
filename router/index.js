import express from 'express';
import adminRoutes from './adminRouter.js';
import catatanRoutes from './catatanRouter.js';
import fiturRoutes from './fiturRouter.js';
import mentorRoutes from './mentorRouter.js';
import notificationRoutes from './notificationRouter.js';
import penggunaRoutes from './penggunaRouter.js';
import kategoriRouters from './katagoriRouter.js';
import modulRouters from './moduleRouter.js';

const router = express.Router();

// Gabungkan semua route
router.use('/adminRouter', adminRoutes);
router.use('/catatanRouter', catatanRoutes);
router.use('/fiturRouter', fiturRoutes);
router.use('/mentorRouter', mentorRoutes);
router.use('/notifRouter', notificationRoutes);
router.use('/penggunaRouter', penggunaRoutes);
router.use('/kategoriRouter', kategoriRouters);
router.use('/modulRouter', modulRouters);

export default router;
