import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAutenticado(req: Request, res: Response, next: NextFunction) {
  const autetToken = req.headers.authorization;
  // console.log(autetToken); // testar se o token esta chegando

  if (!autetToken) {
    // return res.status(401).end(); // tratar condicional fora do try
    return res.json({ dados: "Token Invalido" }); // tratar condicional dentro do try
  }

  const [, token] = autetToken.split(" "); // separa o token

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub;
    // console.log(sub);
    return next();
  } catch (err) {
    // return res.status(401).end(); // tratar condicional fora do try
    return res.json({ dados: "Token Expirado" }); // tratar condicional dentro do try
  }
}
