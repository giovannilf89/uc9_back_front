import { Request, Response } from "express";
import { CriarCategoriaServices } from "../../Services/Categoria/CriarCategoriaServices";

class CriarCategoriaController {
  async handle(req: Request, res: Response) {
    const { nome } = req.body;
    // console.log(nome);

    const criarCategoriaServices = new CriarCategoriaServices();
    const resposta = await criarCategoriaServices.execute({
      nome,
    });
    return res.json(resposta);
  }
}

export { CriarCategoriaController };
