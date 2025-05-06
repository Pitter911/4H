<template>
  <div class="prestamos-recientes">
    <h1>Préstamos Recientes</h1>
    <div v-if="prestamos.length > 0" class="prestamos-list">
      <div 
        v-for="(prestamo, index) in prestamos" 
        :key="index" 
        class="prestamo-item"
      >
        <p><strong>Artículo:</strong> {{ prestamo.articulo }}</p>
        <p><strong>Fecha:</strong> {{ prestamo.fecha }}</p>
        <button @click="confirmarPrestamo(index)">Confirmar</button>
      </div>
    </div>
    <div v-else>
      <p>No tienes préstamos recientes.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrestamosRecientes",
  data() {
    return {
      prestamos: [
        { articulo: "Libro de Matemáticas", fecha: "2025-05-01" },
        { articulo: "Calculadora Científica", fecha: "2025-05-02" },
      ],
    };
  },
  methods: {
    confirmarPrestamo(index) {
      this.prestamos.splice(index, 1);
      alert("Préstamo confirmado.");
    },
  },
};
</script>

<style scoped>
.prestamos-recientes {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.prestamos-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.prestamo-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #ffffff;
  color: #2196f3;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #21cbf3;
  color: white;
}

@media (max-width: 600px) {
  .prestamos-recientes {
    padding: 10px;
  }

  .prestamo-item {
    padding: 10px;
  }

  button {
    padding: 8px;
  }
}
</style>