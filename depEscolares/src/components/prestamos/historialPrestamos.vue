<template>
  <div class="historial-prestamos">
    <h1>Historial de Préstamos</h1>
    <div v-if="historial.length > 0" class="historial-list">
      <div 
        v-for="(prestamo, index) in historial" 
        :key="index" 
        class="historial-item"
      >
        <p><strong>Artículo:</strong> {{ prestamo.articulo }}</p>
        <p><strong>Fecha:</strong> {{ prestamo.fecha }}</p>
        <p v-if="isAdmin"><strong>Alumno:</strong> {{ prestamo.alumno }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay historial de préstamos disponible.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistorialPrestamos",
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      historial: this.isAdmin
        ? [
            { articulo: "Libro de Física", fecha: "2025-04-20", alumno: "Juan Pérez" },
            { articulo: "Microscopio", fecha: "2025-04-22", alumno: "Ana López" },
          ]
        : [
            { articulo: "Libro de Física", fecha: "2025-04-20" },
            { articulo: "Microscopio", fecha: "2025-04-22" },
          ],
    };
  },
};
</script>

<style scoped>
.historial-prestamos {
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

.historial-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.historial-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 600px) {
  .historial-prestamos {
    padding: 10px;
  }

  .historial-item {
    padding: 10px;
  }
}
</style>