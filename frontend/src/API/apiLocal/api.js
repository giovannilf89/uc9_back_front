import axios from "axios";

const apiLocal = axios.create({
  baseURL: "https://node-deploy-senac-jopv.onrender.com",
});

export default apiLocal;
