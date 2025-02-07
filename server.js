import express from "express";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transaction.routes.js";
import connectDb from "./db/connectToDB.js";
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/transaction", transactionRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Example app listening on port ${PORT}!`);
});
