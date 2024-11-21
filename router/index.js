import express from "express";
import adminRoutes from "./adminRouter/adminRouter";
import mentorRoutes from "./mentorRouter/mentorRouter";
import fiturRoutes from "./fiturRouter/fiturRouter";
import catatanRoutes from "./catatanRouter/catatanRouter";
import penggunaRoutes from "./penggunaRouter/penggunaRouter";
import notificationRoutes from "./notificationRouter/notificationRouter";


// Inisialisasi router utama
const Router = express.Router();
const apiBasePath = "/api/v1";

Router.use(`${apiBasePath}/admin`, adminRoutes);

Router.use(`${apiBasePath}/mentor`, mentorRoutes);

Router.use(`${apiBasePath}/fitur`, fiturRoutes);

Router.use(`${apiBasePath}/catatan`, catatanRoutes);

Router.use(`${apiBasePath}/pengguna`, penggunaRoutes)

Router.use(`${apiBasePath}/notification`, notificationRoutes);

export default Router;
