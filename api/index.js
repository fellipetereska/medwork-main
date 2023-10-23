import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";

//usign express
const app = express();

//Using imports
app.use(express.json());
app.use(cors())

app.use("/", userRoutes);

//Port
app.listen(8800)