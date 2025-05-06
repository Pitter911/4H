<template>
  <div class="agregar-herramienta">
    <h1>Agregar Nueva Herramienta</h1>
    <form @submit.prevent="agregarHerramienta">
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
      <div class="form-group">
        <label for="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          v-model="herramienta.stock"
          placeholder="Ingrese el stock"
          min="0"
          required
        />
      </div>
      <div class="form-group">
        <label for="imgUrl">URL de la Imagen:</label>
        <input
          type="url"
          id="imgUrl"
          v-model="herramienta.imgUrl"
          placeholder="Ingrese la URL de la imagen"
          required
        />
      </div>
      <div class="buttons">
        <button type="submit" class="btn agregar">Agregar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AgregarHerramienta",
  data() {
    return {
      herramienta: {
        nombre: "",
        descripcion: "",
        stock: 0,
        imgUrl: "",
      },
    };
  },
  methods: {
    agregarHerramienta() {
      // Lógica para agregar la herramienta
      alert(`Herramienta "${this.herramienta.nombre}" agregada con éxito.`);
      this.herramienta = { nombre: "", descripcion: "", stock: 0, imgUrl: "" }; // Reiniciar formulario
    },
  },
};
</script>

<style scoped>
.agregar-herramienta {
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
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
}

@media (max-width: 600px) {
  .form-group {
    margin-bottom: 10px;
  }

  .btn {
    width: 100%;
  }
}
</style>