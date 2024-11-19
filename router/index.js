import express from "express";
import adminRoutes from "./adminRouter/adminRouter";
import mentorRoutes from "./mentorRouter/mentorRouter";


// Inisialisasi router utama
const Router = express.Router();
const apiBasePath = "/api/v1";

// Gunakan adminRoutes untuk path /api/v1/admin
Router.use(`${apiBasePath}/admin`, adminRoutes);

// Gunakan mentorRoutes untuk path /api/v1/mentor
Router.use(`${apiBasePath}/mentor`, mentorRoutes);

export default Router;
