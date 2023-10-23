import prismaClient from "../../prisma";

interface CriarProduto {
  nome: string;
  fabricante: string;
  quantidade: string;
  banner: string;
  preco: string;
  categoriaId: string;
}

class CriarProdutoServices {
  async execute({
    nome,
    fabricante,
    quantidade,
    banner,
    preco,
    categoriaId,
  }: CriarProduto) {
    if (!nome || !quantidade || !banner || !preco || !categoriaId) {
      throw new Error("Camps em branco não são permitidos");
    }

    await prismaClient.produto.create({
      data: {
        nome: nome,
        fabricante: fabricante,
        quantidade: quantidade,
        banner: banner,
        preco: preco,
        categoriaId: categoriaId,
      },
    });
    return { dados: "Dados salvos com sucesso" };
  }
}

export { CriarProdutoServices };
