import prismaClient from "../../prisma";

class ListarCategoriaServices {
  async execute() {
    const resposta = await prismaClient.categoria.findMany({});
    return resposta;
  }
}

export { ListarCategoriaServices };
