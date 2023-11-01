import { createContext, useState } from "react"; // {createContext} biblioteca para manipulacao de dados entre arquivos dentro da aplicação
import { toast } from "react-toastify";
import api from "../API/apiLocal/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // children herda as funcionalidades do pai

  const [user, setUser] = useState("");

  const isAutenthicated = !!user; // determina se o usuario esta logado ou não (! vazio ou falso / !! se for verdadeiro )(vira booleano)

  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken); // convertendo string para objeto

  async function loginToken() {
    try {
      const resposta = await api.get("/ListarUsuarioToken", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      console.log(resposta);
    } catch (err) {
      console.log(err);
    }
  }

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
    <AuthContext.Provider value={{ signIn, loginToken }}>
      {children}
    </AuthContext.Provider>
  );
}
