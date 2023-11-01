import { Router } from "express";
import { CriarCategoriaController } from "./Controller/Categoria/CriarCategoriaController";
import { LoginController } from "./Controller/Login/LoginController";
import { CriarProdutosController } from "./Controller/Produtos/CriarProdutoController";
import { CriarUsuariosController } from "./Controller/Usuarios/CriarUsuariosController";

import multer from "multer";
import uploadConfig from "./config/multer"; // caminhar relativo, começa no diretorio / absoluto começa na raiz
import { isAutenticado } from "./middleware/isAutenticado";
import { ListarCategoriaController } from "./Controller/Categoria/ListarCategoriaController";
import { ListarUsuarioTokenController } from "./Controller/Usuarios/ListarUsuarioTokenController";

const router = Router();
const upload = multer(uploadConfig.upload("./src/tmp")); // uma constante para cada caminho (ex: carro, moto)

//Rotas de login

router.post("/LoginUsuarios", new LoginController().handle);

// Usuarios

router.post("/CriarUsuarios", new CriarUsuariosController().handle);
router.get(
  "/ListarUsuarioToken",
  isAutenticado,
  new ListarUsuarioTokenController().handle
);

// Produtos

router.post(
  "/CriarProdutos",
  isAutenticado,
  upload.single("file"),
  new CriarProdutosController().handle
);

export { router };

// Categoria

router.post(
  "/CriarCategoria",
  isAutenticado,
  new CriarCategoriaController().handle
);

router.get(
  "/ListarCategoria",
  isAutenticado,
  new ListarCategoriaController().handle
);
