import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";

// Usando express
const app = express();

// Analisando as solicitações com corpo JSON
app.use(express.json());

// Middleware para permitir solicitações CORS
app.use(cors({
  origin: 'medwork-main-git-tereska-fellipetereska.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

// Usar as rotas definidas em userRoutes no caminho "/"
app.use("/", userRoutes);

// Port
app.listen(8800, () => {
  console.log("Servidor Conectado");
});
