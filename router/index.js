import express from "express";
import adminRoutes from "./adminRouter/adminRouter";
import mentorRoutes from "./mentorRouter/mentorRouter";
import fiturRoutes from "./fiturRouter/fiturRouter";
import catatanRoutes from "./catatanRouter/catatanRouter";


// Inisialisasi router utama
const Router = express.Router();
const apiBasePath = "/api/v1";

Router.use(`${apiBasePath}/admin`, adminRoutes);

Router.use(`${apiBasePath}/mentor`, mentorRoutes);

Router.use(`${apiBasePath}/fitur`, fiturRoutes);

Router.use(`${apiBasePath}/catatan`, catatanRoutes);

export default Router;
