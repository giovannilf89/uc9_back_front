import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface LoginUsuarios {
  email: string;
  password: string;
}

class LoginServices {
  async execute({ email, password }: LoginUsuarios) {
    // console.log(email, password);

    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });
    // console.log(usuario); // testar se esta recebendo do controller
    if (!usuario) {
      throw new Error("Usuario/Senha incorretos");
    }
    const autenticado = await compare(password, usuario.senha);
    if (!autenticado) {
      throw new Error("Usuario/Senha incorretos");
    }

    const token = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET, // mudar no tsconfig  Type Checking  "strict": true to false

      {
        subject: usuario.id,
        expiresIn: "1h",
      }
    );
    return {
      id: usuario.id,
      email: usuario.email,
      token: token,
    };
  }
}

export { LoginServices };
