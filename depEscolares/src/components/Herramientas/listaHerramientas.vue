<template>
  <h1 class="titulo">Lista de Herramientas</h1>
  <div class="lista-herramientas">
    <div class="herramientas-container">
      <div v-for="herramienta in herramientas" :key="herramienta.id" class="herramienta-card">
        <img :src="herramienta.imagenURL" alt="Imagen de la herramienta" class="herramienta-imagen" />
        <h2>{{ herramienta.nombre }}</h2>
        <p>{{ herramienta.descripcion }}</p>
        <p><strong>Stock:</strong> {{ herramienta.stock }}</p>
        <p><strong>Agregado el:</strong> {{ herramienta.fechaFormateada }}</p>

        <!-- Botón para solicitar préstamo -->
        <button v-if="isLoggedIn" @click="solicitarPrestamo(herramienta)" :disabled="herramienta.stock <= 0">
          Solicitar Préstamo
        </button>

        <!-- Formulario para modificar cantidad de préstamo -->
        <div v-if="herramienta.prestamoSolicitado">
          <p><strong>Cantidad solicitada:</strong>
            <input v-model.number="herramienta.cantidadSolicitada" type="number" min="1" :max="herramienta.stock" />
          </p>

          <!-- Fecha de devolución -->
          <p><strong>Fecha de devolución:</strong>
            <input type="date" v-model="herramienta.fechaDevolucion" min="2025-01-01" />
          </p>

          <button @click="confirmarPrestamo(herramienta)">Confirmar Préstamo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import { format } from "date-fns"; // Asegúrate de instalar date-fns si no lo tienes

export default {
  name: "ListaHerramientas",
  data() {
    return {
      herramientas: [],
      isLoggedIn: false, // Verifica si el usuario está autenticado
    };
  },
  mounted() {
    // Simulando inicio de sesión
    setTimeout(() => {
      this.isLoggedIn = true;
    }, 2000);

   apiService.getHerramientas()
  .then((response) => {
    console.log("Datos de herramientas:", response.data); // <--- verifica aquí
    this.herramientas = response.data.map(herramienta => {
      herramienta.fechaFormateada = format(new Date(herramienta.fechaAgregado), 'dd/MM/yyyy');
      herramienta.prestamoSolicitado = false;
      herramienta.cantidadSolicitada = 1;
      herramienta.fechaDevolucion = '';
      return herramienta;
    });
  })
  .catch((error) => {
    console.error("Error al cargar herramientas:", error);
  });
  },
  methods: {
    getUsuarioId() {
      return 1; // ID simulado de un usuario
    },

    solicitarPrestamo(herramienta) {
      herramienta.prestamoSolicitado = true;
      this.herramientaSeleccionada = herramienta;
      if (herramienta.stock <= 0) {
        alert("No hay stock disponible para préstamo.");
      }
    },

    confirmarPrestamo(herramienta) {
      if (!this.herramientaSeleccionada || !this.herramientaSeleccionada.id) {
        alert("No se ha seleccionado una herramienta válida.");
        return;
      }

      if (!herramienta.fechaDevolucion) {
        alert("Por favor, selecciona una fecha de devolución.");
        return;
      }

      if (herramienta.cantidadSolicitada > herramienta.stock) {
        alert("No hay suficiente stock disponible.");
        return;
      }

      const prestamo = {
        usuario: { id: this.getUsuarioId() },
        herramienta: { id: herramienta.id },
        fechaPrestamo: new Date().toISOString().split("T")[0],
        fechaDevolucion: herramienta.fechaDevolucion,
        estado: "PENDIENTE",
      };

      // Paso 1: Registrar préstamo
      apiService.registrarPrestamo(prestamo)
        .then(() => {
          // Paso 2: Actualizar stock
          const nuevoStock = herramienta.stock - herramienta.cantidadSolicitada;
          const herramientaActualizada = {
            ...herramienta,
            stock: nuevoStock,
          };

          return apiService.actualizarHerramienta(herramienta.id, herramientaActualizada);
        })
        .then(() => {
          alert("Préstamo confirmado y stock actualizado.");
          herramienta.prestamoSolicitado = false;
          herramienta.stock -= herramienta.cantidadSolicitada;
        })
        .catch((error) => {
          console.error("Error al procesar préstamo:", error);
        });
    },
  },
};
</script>

<style scoped>
.lista-herramientas {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  color: white;
  min-height: 100vh;
  box-sizing: border-box;
}

.titulo {
  position: absolute;
  top: 12%;
  left: 20px;
  margin: 0;
  font-size: 24px;
  color: white;
}

.herramientas-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.herramienta-card {
  background: rgba(255, 255, 255, 0.25);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 calc(33% - 20px);
  max-width: calc(33% - 20px);
  box-sizing: border-box;
}

.herramienta-card h2 {
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.herramienta-card p {
  font-size: 14px;
  color: #fff;
}

.herramienta-imagen {
  width: 100%;
  max-width: 150px;
  height: auto;
  margin: 0 auto 16px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .herramienta-card {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .herramienta-card h2 {
    font-size: 1rem;
  }
}
button {
  background-color: #72BF78;
  border: none;
  color: white;
  padding: 10px 16px;
  margin: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #5aa15f;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

input[type="number"],
input[type="date"] {
  padding: 8px;
  margin-top: 6px;
  border: none;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffffb2;
  color: #333;
  font-size: 14px;
}

input[type="number"]:focus,
input[type="date"]:focus {
  outline: none;
  box-shadow: 0 0 4px #a0d683;
}

</style>
