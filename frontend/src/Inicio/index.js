import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./inicio.estilo.scss";
import { toast } from "react-toastify";

export default function Inicio() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    // console.log(email, password);
    let data = {
      // recebe json do front
      email,
      password,
    };

    const resposta = await signIn(data);
    // console.log(resposta);
    if (!resposta) {
      toast.error("Erro de login");
    } else if (resposta) {
      const token = resposta.data.token;
      localStorage.setItem("@tklogin2023", JSON.stringify(token)); // nome (qualquer) tklogin2023 da key para armazenar o token(local storage)
      toast.success("Login efetuado com sucesso");
      navigation("/Dashboard");
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
