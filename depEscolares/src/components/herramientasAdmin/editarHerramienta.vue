<template>
  <div class="editar-herramienta">
    <h1>Editar o Eliminar Herramienta</h1>
    <form @submit.prevent="editarHerramienta">
      <div class="form-group">
        <label for="nombre">Nombre de la Herramienta:</label>
        <input
          type="text"
          id="nombre"
          v-model="herramienta.nombre"
          placeholder="Ingrese el nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model="herramienta.descripcion"
          placeholder="Ingrese la descripción"
          required
        ></textarea>
      </div>
      <div class="buttons">
        <button type="submit" class="btn editar">Editar</button>
        <button type="button" class="btn eliminar" @click="eliminarHerramienta">
          Eliminar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditarHerramienta",
  data() {
    return {
      herramienta: {
        nombre: "",
        descripcion: "",
      },
    };
  },
  methods: {
    editarHerramienta() {
      // Lógica para editar la herramienta
      alert(`Herramienta "${this.herramienta.nombre}" editada con éxito.`);
    },
    eliminarHerramienta() {
      // Lógica para eliminar la herramienta
      const confirmacion = confirm(
        `¿Está seguro de que desea eliminar la herramienta "${this.herramienta.nombre}"?`
      );
      if (confirmacion) {
        alert(`Herramienta "${this.herramienta.nombre}" eliminada con éxito.`);
        this.herramienta = { nombre: "", descripcion: "" }; // Reiniciar formulario
      }
    },
  },
};
</script>

<style scoped>
.editar-herramienta {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  padding: 20px;
  border-radius: 8px;
  color: white;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
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
textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: none;
  height: 100px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn.editar {
  background-color: #4caf50;
  color: white;
}

.btn.eliminar {
  background-color: #f44336;
  color: white;
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
  }
}
</style>