import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import morgan from 'morgan';

// Usando express
const app = express();

// // Log das solicitações HTTP
// morgan.token('body', (req) => JSON.stringify(req.body));
// app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :user-agent'));
// console.log(morgan.token)

// Analisando as solicitações com corpo JSON
app.use(express.json());

// Middleware para permitir solicitações CORS
const corsConfig = {
  // origin: 'https://medwork-main.vercel.app',
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsConfig));

app.use(bodyParser.json());

// Usar as rotas definidas em userRoutes no caminho "/"
app.use("/", userRoutes);

// Port
app.listen(8800, () => {
  console.log("Servidor Conectado");
});
