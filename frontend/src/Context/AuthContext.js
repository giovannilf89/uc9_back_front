import { createContext, useState } from "react"; // {createContext} biblioteca para manipulacao de dados entre arquivos dentro da aplicação
import { toast } from "react-toastify";
import api from "../API/apiLocal/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // children herda as funcionalidades do pai

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const isAutenthicated = !!user; // determina se o usuario esta logado ou não (! vazio ou falso / !! se for verdadeiro )

  async function signIn({ email, password }) {
    // recebe desconstruida ({})
    try {
      const resposta = await api.post("/LoginUsuarios", {
        email,
        password,
      });
      // console.log(resposta)
      return resposta;
    } catch (err) {}
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
}
