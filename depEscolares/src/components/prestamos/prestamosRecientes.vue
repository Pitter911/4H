<template>
  <div class="prestamos-recientes">
    <h1>Mis Préstamos</h1>
    <ul v-if="prestamos.length" class="prestamos-list">
      <li v-for="prestamo in prestamos" :key="prestamo.id" class="prestamo-item">
        Herramienta: {{ prestamo.herramienta.nombre }}<br />
        Fecha: {{ format(new Date(prestamo.fecha_prestamo), 'dd/MM/yyyy') }}<br />
        Estado: <span :class="prestamo.estado">{{ prestamo.estado }}</span>
      </li>
    </ul>
    <p v-else>No tienes préstamos aún.</p>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import { format } from "date-fns"; // Asegúrate de instalar date-fns si no lo tienes
console.log("Métodos disponibles:", Object.keys(apiService));
export default {
  name: "PrestamosRecientes",
  data() {
    return {
      prestamos: [],
      usuarioId: 1, // Puedes reemplazarlo por el ID dinámico si usas autenticación
    };
  },
  mounted() {
  apiService.getPrestamosPorUsuario(this.usuarioId)
    .then((response) => {
      this.prestamos = response.data;
    })
    .catch((error) => {
      console.error("Error al obtener préstamos:", error);
    });
}, 
  methods: {
    format
  }
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