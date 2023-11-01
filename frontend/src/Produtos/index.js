import React, { useState, useEffect } from "react";
import "./produtos.estilo.scss";
import apiLocal from "../API/apiLocal/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Produtos() {
  const navigation = useNavigate();
  const [categoria, setCategoria] = useState([""]);
  const [nome, setNome] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  const [idCategoria, setIdCategoria] = useState(""); // armazena o id da categoria
  const [imagem, setImagem] = useState(null); // começa como nulo por ser um objeto

  const iToken = localStorage.getItem("@tklogin2023"); // pegando token do local storage
  // console.log(iToken);
  const token = JSON.parse(iToken); // convertendo para JSON

  useEffect(() => {
    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await apiLocal.get("/ListarUsuarioToken", {
          headers: {
            Authorization: "Bearer " + `${token}`, // `${token}` executando alguma coisa, const ou var
          },
        });
        // console.log(resposta); testar se token é valido
        if (resposta.data.dados) {
          navigation("/");
          // alert("token");
          // console.log(resposta);
          return;
        }
      }
      verificaToken();
    }
  }, []); //[] vazio roda uma vez, com nome da const atualiza assim que houver uma mudança

  function handleImage(e) {
    if (!e.target.files) {
      // testa se esta recebendo um arquivo
      console.log("erro, sem arquivo anexado");
      return;
    }
    const image = e.target.files[0]; //pegar a imagem e jogar na constante
    if (image.type === "image/png" || image.type === "image/jpeg") {
      setImagem(image);
    }
  }

  async function handleCadastrar(e) {
    //async pq vai conectar no bd / e de evento ao clicar ativa o evento
    // console.log(nome, fabricante, quantidade, preco);
    // console.log(idCategoria);
    // console.log(imagem);
    try {
      e.preventDefault(); // nao deixa resetar os campos
      const categoriaId = idCategoria;

      const data = new FormData(); // instancia classe formData na constante data
      data.append("nome", nome); // 1- nome é do controller / 2- constante do front (tem que ter o mesmo nome)
      data.append("fabricante", fabricante);
      data.append("quantidade", quantidade);
      data.append("preco", preco);
      data.append("categoriaId", categoriaId);
      data.append("file", imagem);

      const resposta = await apiLocal.post("/CriarProdutos", data); //data é a caixinha com todas as infos que vai pro backend
      // console.log(resposta);
      toast.success(resposta.data.dados);
      // window.location.reload();
      // reseta todos os campos mas cancela o toast :( / Usar useState como ex abaixo.
    } catch (err) {
      console.log("err");
      // toast.warning("Erro, campos vazios");
    }
    setNome(""); // limpa o campo depois do cadastro / ou usar navigate para redirecionar
    setFabricante("");
    setQuantidade("");
    setPreco("");
    setIdCategoria("");
    setImagem(null);
  }

  return (
    <div className="containerProdutosCadastro">
      <div>
        <h1>Produtos</h1>
      </div>
      <div>
        <form onSubmit={handleCadastrar}>
          <label>Categoria: </label>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option>Selecione...</option>
            {categoria.map((catFinal) => {
              return (
                <option value={catFinal.id_cat} key={catFinal.id_cat}>
                  {/* Key={} serve para nao dar erro de renderização*/}
                  {catFinal.nome}
                </option>
              );
            })}
          </select>
          <label>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Fabricante: </label>
          <input
            type="text"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
          <label>Quantidade: </label>
          <input
            type="text"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <label>Preco: </label>
          <input
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <label>Imagem: </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImage}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
