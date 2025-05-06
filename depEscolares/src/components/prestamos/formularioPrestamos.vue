<template>
  <div class="formulario-prestamos">
    <h2>Registrar Préstamo</h2>
    <form @submit.prevent="registrarPrestamo">
      <div class="form-group">
        <label for="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          v-model="prestamo.usuario"
          placeholder="Nombre del usuario"
          required
        />
      </div>
      <div class="form-group">
        <label for="articulo">Artículo</label>
        <input
          type="text"
          id="articulo"
          v-model="prestamo.articulo"
          placeholder="Artículo prestado"
          required
        />
      </div>
      <div class="form-group">
        <label for="fecha">Fecha de Préstamo</label>
        <input
          type="date"
          id="fecha"
          v-model="prestamo.fecha"
          required
        />
      </div>
      <div class="form-group">
        <label for="comentarios">Comentarios</label>
        <textarea
          id="comentarios"
          v-model="prestamo.comentarios"
          placeholder="Comentarios adicionales"
        ></textarea>
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormularioPrestamos",
  data() {
    return {
      prestamo: {
        usuario: "",
        articulo: "",
        fecha: "",
        comentarios: "",
      },
    };
  },
  methods: {
    registrarPrestamo() {
      console.log("Préstamo registrado:", this.prestamo);
      alert("Préstamo registrado con éxito");
      this.prestamo = {
        usuario: "",
        articulo: "",
        fecha: "",
        comentarios: "",
      };
    },
  },
};
</script>

<style scoped>
.formulario-prestamos {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  color: #fff;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

input,
textarea {
  margin-bottom: 10px;
}

textarea {
  resize: none;
  height: 80px;
}

button {
  background-color: #1976d2;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1565c0;
}

@media (max-width: 600px) {
  .formulario-prestamos {
    padding: 15px;
  }

  input,
  textarea,
  button {
    font-size: 14px;
  }
}
</style>