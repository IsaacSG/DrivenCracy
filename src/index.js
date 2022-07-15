import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/pollRoutes.js";
import choiceRoutes from "./routes/choiceRoutes.js";


const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(pollRoutes)
app.use(choiceRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor OK`);
})