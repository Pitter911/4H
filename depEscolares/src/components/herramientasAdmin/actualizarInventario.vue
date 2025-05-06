<template>
  <div class="actualizar-inventario">
    <h1>Actualizar Inventario</h1>
    <form @submit.prevent="agregarStock">
      <div class="form-group">
        <label for="producto">Producto</label>
        <select v-model="productoSeleccionado" id="producto" required>
          <option v-for="producto in productos" :key="producto.id" :value="producto.id">
            {{ producto.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad a agregar</label>
        <input
          type="number"
          id="cantidad"
          v-model.number="cantidad"
          min="1"
          required
        />
      </div>
      <button type="submit">Agregar Stock</button>
    </form>
    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [
        { id: 1, nombre: "Cuaderno" },
        { id: 2, nombre: "Lápiz" },
        { id: 3, nombre: "Borrador" },
      ],
      productoSeleccionado: null,
      cantidad: null,
      mensaje: "",
    };
  },
  methods: {
    agregarStock() {
      if (this.productoSeleccionado && this.cantidad > 0) {
        this.mensaje = `Se agregó ${this.cantidad} unidades al producto con ID ${this.productoSeleccionado}.`;
        this.cantidad = null;
        this.productoSeleccionado = null;
      } else {
        this.mensaje = "Por favor, selecciona un producto y una cantidad válida.";
      }
    },
  },
};
</script>

<style scoped>
.actualizar-inventario {
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
select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1565c0;
}

.mensaje {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
}
</style>