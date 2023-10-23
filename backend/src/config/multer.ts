import crypto from "crypto"; // biblioteca cria uma hash unica (pre-nome) para evitar de conflito/erro de imagem com mesmo nome durante cadastro
import multer from "multer";

import { extname, resolve } from "path"; // biblioteca do node para resolução de caminho

export default {
  upload(folder: string) {
    // upload é o metodo da classe e nao constante/varivel
    // upload função que recebe  / folder é tipificado como string (não precisa interface)
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder), // dirname = diretorio corrente que vc esta / '..' voltar diretorio
        filename: (request, file, callback) => {
          // apontamento da estrutura do arquivo que vc vai receber / callback requisicao
          const fileHash = crypto.randomBytes(16).toString("hex"); // criação da hash
          const fileName = `${fileHash}-${file.originalname}`; // cria o nome completo que vai ser salvo no banco de dados

          return callback(null, fileName); // retorno null (parte de erro, ainda nao vamos setar)
        },
      }),
    };
  },
};
