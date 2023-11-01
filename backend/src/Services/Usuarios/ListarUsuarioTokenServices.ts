import prismaClient from "../../prisma";

interface TokenId {
  id: string;
}

class ListarUsuarioTokenServices {
  async execute({ id }: TokenId) {
    // console.log("service", id);
    const resposta = await prismaClient.usuario.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    // console.log(resposta);
    return resposta;
  }
}

export { ListarUsuarioTokenServices };
