import { Request, Response } from "express";
import { ListarCategoriaServices } from "../../Services/Categoria/ListarCategoriaServices";
import { ListarUsuarioTokenServices } from "../../Services/Usuarios/ListarUsuarioTokenServices";

class ListarUsuarioTokenController {
  async handle(req: Request, res: Response) {
    const id = req.user_id; //traz o id la do sub
    // console.log("controller", id);
    const listarUsuarioToken = new ListarUsuarioTokenServices();
    const resposta = await listarUsuarioToken.execute({
      id,
    });
    return res.json(resposta);
  }
}

export { ListarUsuarioTokenController };
