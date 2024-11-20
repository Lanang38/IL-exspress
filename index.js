import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { testConnection } from "./Database/db.js";
const router = require("./router")

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(router);
app.use(cors());

// Middleware Express lainnya
app.use(express.json());

app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
