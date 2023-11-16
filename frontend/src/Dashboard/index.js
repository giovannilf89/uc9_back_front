import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiLocal from "../API/apiLocal/api";

export default function Dashboard() {
  const navigation = useNavigate();

  useEffect(() => {
    const iToken = localStorage.getItem("@tklogin2023");
    const token = JSON.parse(iToken);
    // console.log(token);

    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await apiLocal.get("/ListarUsuarioToken", {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        });
        // console.log(resposta); verificar se o token esta valido
        if (resposta.data.dados) {
          navigation("/");
          // alert("token inv"); testar
          return;
        }
        console.log(resposta);
      }
      verificaToken();
    }
  }, []);

  function handleSair() {
    localStorage.removeItem("@tklogin2023"); // remove apenas o token da aplicação
    navigation("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/Produtos">Cadastrar Produtos</Link>
      <button onClick={handleSair}>Sair</button>
    </div>
  );
}
