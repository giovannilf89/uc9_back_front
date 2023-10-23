import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Inicio from "./Inicio/index";
import Produtos from "./Produtos";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Produtos" element={<Produtos />} />
      </Routes>
    </BrowserRouter>
  );
}
