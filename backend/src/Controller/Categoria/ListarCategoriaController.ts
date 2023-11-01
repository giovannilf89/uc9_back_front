import { Request, Response } from "express";
import { ListarCategoriaServices } from "../../Services/Categoria/ListarCategoriaServices";

class ListarCategoriaController {
  async handle(req: Request, res: Response) {
    const listarCategoriaServices = new ListarCategoriaServices();
    const resposta = await listarCategoriaServices.execute();
    return res.json(resposta);
  }
}

export { ListarCategoriaController };
