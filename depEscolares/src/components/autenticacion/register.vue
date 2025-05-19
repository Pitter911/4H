<template>
  <div class="registro-container">
    <div class="card">
      <h1>Registro</h1>
      <form @submit.prevent="submitForm">
        <div v-for="(field, key) in formFields" :key="key" class="form-group">
          <label :for="key">{{ field.label }}</label>
          <input :type="field.type" :id="key" v-model="form[key]" :placeholder="field.placeholder"
            :required="field.required" />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <!-- Mensajes de éxito o error -->
      <p v-if="registroExitoso" class="success-message">¡Registro exitoso!</p>
      <p v-if="mensajeError" class="error-message">{{ mensajeError }}</p>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        password: ''
      },
      formFields: {
        nombre: { label: 'Nombre:', type: 'text', placeholder: 'Ingresa tu nombre', required: true },
        email: { label: 'Email:', type: 'email', placeholder: 'Ingresa tu email', required: true },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Ingresa tu contraseña', required: true }
      },
      registroExitoso: false,
      mensajeError: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const respuesta = await apiService.registrarUsuario(this.form);
        console.log('Respuesta del backend:', respuesta);

        this.registroExitoso = true;
        this.mensajeError = '';

        // Limpiar formulario
        this.form = { nombre: '', email: '', password: '' };

        // Redirigir después de un tiempo
        setTimeout(() => {
          this.registroExitoso = false;
          this.$router.push('/login'); // Cambia la ruta según tu configuración
        }, 2000);

      } catch (error) {
        console.error('Error al registrar:', error);
        this.mensajeError = 'Error al registrar usuario. Revisa los campos.';
        this.registroExitoso = false;

        setTimeout(() => {
          this.mensajeError = '';
        }, 4000);
      }
    }
  }
};
</script>


<style scoped>
/* Tu estilo ya incluido */
.registro-container {
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

h1 {
  margin-bottom: 20px;
  font-size: 2.8rem;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  color: #333;
}

.card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 1.2rem;
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

button {
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
}

button:hover {
  background-color: #1565c0;
  transform: scale(1.03);
}

button:active {
  background-color: #0d47a1;
  transform: scale(0.98);
}

/* ✅ Mensajes */
.success-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
  animation: fadeInOut 3s ease forwards;
}

.error-message {
  margin-top: 20px;
  color: red;
  font-weight: bold;
  animation: fadeInOut 4s ease forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
