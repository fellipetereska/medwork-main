import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";

// Usando express
const app = express();

// Analisando as solicitações com corpo JSON
app.use(express.json());

// Middleware para permitir solicitações CORS
app.use(cors());
app.use(bodyParser.json());

// Usar as rotas definidas em userRoutes no caminho "/"
app.use("/", userRoutes);
// app.use("/setor_empresa", userRoutes)

// Port
app.listen(8800, () => {
  console.log("Servidor Conectado");
});
