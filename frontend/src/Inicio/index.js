import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./inicio.estilo.scss";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";

export default function Inicio() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (resposta.data.dados) {
          navigation("/");
          // alert("token invalido"); //testar se esta entrando nessa condicional
          return;
        }
        console.log(resposta); // consulta a resposta da api
      }
      verificaToken();
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Existem campos em Branco");
    }
    try {
      const resposta = await apiLocal.post("/LoginUsuarios", {
        email,
        password,
      });
      if (resposta.data.id) {
        const token = resposta.data.token;
        localStorage.setItem("@tklogin2023", JSON.stringify(token)); // transformando token em string e armazenando no localstorage
        toast.success("Login efetuado com sucesso");
        navigation("/Dashboard");
      }
    } catch (err) {
      // console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  }

  return (
    <div>
      <div className="loginInicio">
        <h1>Login</h1>
      </div>
      <div className="formInicio">
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
        <p>
          Para se cadastrar clique <Link to="/Login">AQUI</Link>
        </p>
      </div>
    </div>
  );
}

// login usando authcontext

// async function handleLogin(e) {
//   e.preventDefault();
//   // console.log(email, password);
//   let data = {  // criar objeto e enviar via contexto
//     // recebe json do front
//     email,
//     password,
//   };

//   const resposta = await signIn(data);
//   // console.log(resposta);
//   if (!resposta) {
//     toast.error("Erro de login");
//   } else if (resposta) {
//     const token = resposta.data.token;
//     localStorage.setItem("@tklogin2023", JSON.stringify(token)); // nome (qualquer) tklogin2023 da key para armazenar o token(local storage) (local storage só aceita string)
//     toast.success("Login efetuado com sucesso");
//     navigation("/Dashboard");
//   }
// }
