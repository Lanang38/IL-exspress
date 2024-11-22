import express from "express";
import {
  addKategori,
  getAllKategori,
  getSimpleKategori,
  deleteKategori,
} from "../controllers/kategori.js";

const kategoriRouters = express.Router();

kategoriRouters.post("/kategori", addKategori);
kategoriRouters.get("/kategori", getAllKategori);
kategoriRouters.get("/kategori/simple", getSimpleKategori);
kategoriRouters.delete("/kategori/:kategori_id", deleteKategori);

export default kategoriRouters;