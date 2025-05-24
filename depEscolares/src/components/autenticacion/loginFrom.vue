<template>
  <div class="login-container">
    <div class="grid-container">
      <!-- Texto de bienvenida -->
      <div class="welcome-text">
        <h2>Bienvenidos a escolares!</h2>
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
      </div>

      <!-- Botones sociales -->
      <div class="grid-item">
        <div class="form-group">
          <small>Iniciar sesión con:</small>
          <button type="button" class="login-button" style="background: #3b5998;">
            Facebook
          </button>
          <button type="button" class="login-button" style="background: #db4437;">
            Google
          </button>
          <button type="button" class="login-button" style="background: #1da1f2;">
            Twitter
          </button>
        </div>
      </div>

      <!-- Mensajes adicionales -->
      <div class="grid-item full-width">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <small>¿No tienes cuenta? <a href="/register">Registrarse</a></small>
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
          this.router.push("/herramientas");
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
  font-family: 'Roboto', sans-serif;
}

/* Contenedor de la grilla */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Tarjetas */
.grid-item {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.grid-item.full-width {
  grid-column: span 2;
  padding: 1rem;
  max-width: 90%;
  margin: 0 auto;
}

/* Títulos */
h2 {
  margin-bottom: 2rem;
  color: #1e88e5;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Texto de bienvenida */
.welcome-text {
  text-align: center;
  margin-bottom: 2rem;
  grid-column: span 2;
}

.welcome-text h2,
.welcome-text p {
  color: #000;
}

/* Formularios */
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #0d47a1;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 10px rgba(66, 165, 245, 0.5);
}

/* Botón principal */
.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.login-button:hover {
  background: linear-gradient(135deg, #1e88e5, #1565c0);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.login-button:active {
  transform: translateY(0);
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
  color: #d32f2f;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  font-weight: bold;
  text-align: left;
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

/* Texto pequeño */
small {
  font-size: 0.9rem;
  color: #555;
}

/* Responsive */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .grid-item.full-width {
    grid-column: span 1;
  }

  .login-button {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
