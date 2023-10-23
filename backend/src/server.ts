import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express(); //pega funcionalidade do express e joga na const app (instanciando)

app.use(express.json()); //pega a funcionalidade do express.json da constante app e usa o metodo use
app.use(cors()); // esses () dentro de outro () é por ser uma função
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "Erro",
    message: "Error interno do servidor",
  });
});

app.listen(3333, () => console.log("Servidor rodando na porta 3333"));
