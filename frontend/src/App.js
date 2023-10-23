import Rotas from "./routes";
import "./App.scss";
import AuthProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <div className="container-fluid">
        <Rotas />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </AuthProvider>
  );
}

export default App;
