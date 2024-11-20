import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./Database/db.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});