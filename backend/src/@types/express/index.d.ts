// reescrever um middleware de request do express adicionando o atributo USER_ID como uma STRING

declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
