import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { testConnection } from "./Database/db.js";
import router from "./router/index.js";

dotenv.config();

const app = express();

// Middleware global
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Router utama
app.use("/api/v1", router);

// Start server
app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
