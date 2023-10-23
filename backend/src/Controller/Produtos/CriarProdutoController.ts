import { Request, Response } from "express";
import { CriarProdutoServices } from "../../Services/Produtos/CriarProdutoServices";

class CriarProdutosController {
  async handle(req: Request, res: Response) {
    const { nome, fabricante, quantidade, preco, categoriaId } = req.body;
    // console.log(nome, fabricante, quantidade, preco, categoriaId); //banner não vem req.body

    if (!req.file) {
      // caso a imagem nao venha ou venha com problema
      throw new Error("Imagem com problema");
    } else {
      const { originalname, filename: banner } = req.file; //apelidando filename de banner/ recebendo file

      const criarProdutoServices = new CriarProdutoServices();
      const produtos = await criarProdutoServices.execute({
        nome,
        fabricante,
        quantidade,
        banner,
        preco,
        categoriaId,
      });
      return res.json(produtos);
    }
  }
}

export { CriarProdutosController };
