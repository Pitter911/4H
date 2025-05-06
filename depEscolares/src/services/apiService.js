import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // Cambia al URL de tu backend
});

export default {
    // Método para obtener todos los usuarios
    getusuarios() {
        return api.get("/usuarios");
    },
    // Método para login de un usuario
    iniciarSesion(email, password) {
        return api.post("/login", { email, password });
    },
    // Método para registrar un nuevo usuario
    registrarUsuario(usuario) {
        return api.post("/usuarios", usuario);
    },
    // Método para obtener todas las herramientas (Agregado)
  getHerramientas() {
    return api.get("/herramientas");
  }
}