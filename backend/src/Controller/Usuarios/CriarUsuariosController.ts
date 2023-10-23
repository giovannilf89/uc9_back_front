import { Request, Response } from "express";
import { CriarUsuariosServices } from "../../Services/Usuarios/CriarUsuariosServices";

class CriarUsuariosController {
  async handle(req: Request, res: Response) {
    const { nome, email, password } = req.body; // desconstruindo o json {}
    // console.log(nome, email, password);

    const criarUsuariosServices = new CriarUsuariosServices(); // instancia todos os metodos do services para const
    const resposta = await criarUsuariosServices.execute({
      // nova constante para receber retorno do servico
      nome,
      email,
      password,
    });
    return res.json(resposta); // resposta que ele vai dar
  }
}

export { CriarUsuariosController };
