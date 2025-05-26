<template>
  <div class="login-container">
    <div class="grid-container">
      <!-- Texto de bienvenida -->
      <div class="welcome-text">
        <h2>Bienvenidos a Materiales!</h2>
        <p>Por favor inicie sesión!</p>
      </div>

      <!-- Formulario de inicio de sesión -->
      <div class="grid-item">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model.trim="form.email" placeholder="Ingresa tu correo" required
            aria-label="Correo Electrónico" aria-describedby="emailHelp" />
          <small id="emailHelp" class="form-text">
            Nunca compartiremos tu correo electrónico.
          </small>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model.trim="form.password" placeholder="Ingresa tu contraseña" required
            aria-label="Contraseña" />
        </div>

        <button type="button" class="login-button" @click="handleLogin">
          Ingresar
        </button>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <small>¿No tienes cuenta? <a href="/register" class="register-link">Registrarse</a></small>
        </div>
      </div>

 
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      if (!this.form.email || !this.form.password) {
        this.errorMessage = "Por favor, completa todos los campos.";
        return;
      }

      try {
        const response = await apiService.iniciarSesion(
          this.form.email,
          this.form.password
        );
        const usuario = response.data;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        if (usuario.rol === "admin") {
          this.router.push("/dashboardAdmin");
        } else if (usuario.rol === "alumno") {
          this.router.push("/dashboardAlumno");
        } else {
          this.errorMessage = "Rol desconocido. Contacta al administrador.";
        }
      } catch (error) {
        this.errorMessage = "Credenciales incorrectas o error del servidor.";
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  padding: 1.5rem;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: #333;
}

/* Contenedor de la grilla */
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Tarjetas */
.grid-item {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 40px 32px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

/* Títulos */
h2 {
  margin-bottom: 10px;
  font-size: 2.2rem;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.08);
  font-weight: 700;
}

/* Texto de bienvenida */
.welcome-text {
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-text h2,
.welcome-text p {
  color: #333;
}

/* Formularios */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

input {
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #42a5f5;
  outline: none;
  box-shadow: 0 0 10px rgba(66, 165, 245, 0.5);
}

/* Botón principal */
.login-button {
  width: 100%;
  padding: 14px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 10px;
}

.login-button:hover {
  background-color: #1565c0;
  transform: scale(1.03);
}

.login-button:active {
  background-color: #0d47a1;
  transform: scale(0.98);
}

/* Botones sociales */
.login-button[style] {
  margin-top: 0.5rem;
  font-size: 1rem;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-button[style]:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* Mensaje de error */
.error-message {
  margin-top: 10px;
  color: red;
  font-weight: bold;
  animation: fadeInOut 4s ease forwards;
  text-align: left;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

/* Links */
a {
  color: #1e88e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #1565c0;
  text-decoration: underline;
}

.register-link {
  color: #fff !important;
  background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
  padding: 3px 14px;
  border-radius: 16px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(30, 136, 229, 0.12);
  text-shadow: 0 1px 6px rgba(30, 136, 229, 0.18);
  transition: background 0.3s, color 0.3s;
  margin-left: 6px;
  display: inline-block;
}

.register-link:hover {
  background: linear-gradient(90deg, #42a5f5 60%, #1976d2 100%);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(30, 136, 229, 0.18);
}

/* Texto pequeño */
small {
  font-size: 0.95rem;
  color: #555;
}

/* Responsive */
@media (max-width: 480px) {
  .grid-item {
    padding: 24px 8px;
    max-width: 98vw;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>
