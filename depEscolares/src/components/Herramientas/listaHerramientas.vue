<template>
  <h1 class="titulo">Lista de Herramientas</h1>

  <!-- Filtro de categoría -->
  <div class="filtro-categoria">
    <label for="categoriaSelect">Filtrar por categoría:</label>
    <select id="categoriaSelect" v-model="categoriaSeleccionada">
      <option value="">Todas</option>
      <option
        v-for="categoria in categorias"
        :key="categoria"
        :value="categoria"
      >
        {{ categoria }}
      </option>
    </select>
  </div>

  <div class="lista-herramientas">
    <div class="herramientas-container">
      <div
        v-for="herramienta in herramientasFiltradas"
        :key="herramienta.id"
        class="herramienta-card"
      >
        <img
          :src="herramienta.imagenURL"
          alt="Imagen de la herramienta"
          class="herramienta-imagen"
        />
        <h2>{{ herramienta.nombre }}</h2>
        <p>{{ herramienta.descripcion }}</p>
        <p><strong>Categoría:</strong> {{ herramienta.categoria.nombre }}</p>
        <p><strong>Stock:</strong> {{ herramienta.stock }}</p>
        <p><strong>Agregado el:</strong> {{ herramienta.fechaFormateada }}</p>

        <button
          v-if="isLoggedIn"
          @click="solicitarPrestamo(herramienta)"
          :disabled="herramienta.stock <= 0"
        >
          Solicitar Préstamo
        </button>

        <div v-if="herramienta.prestamoSolicitado">
          <p><strong>Cantidad solicitada:</strong>
            <input
              v-model.number="herramienta.cantidadSolicitada"
              type="number"
              min="1"
              :max="herramienta.stock"
            />
          </p>
          <p><strong>Fecha de devolución:</strong>
            <input
              type="date"
              v-model="herramienta.fechaDevolucion"
              :min="fechaHoy"
              :max="fechaMaximaPermitida"
            />
          </p>
          <small class="alerta-fecha">
            * La fecha de devolución debe ser dentro de los próximos 3 días hábiles
          </small>
          <br />
          <button @click="confirmarPrestamo(herramienta)">Confirmar Préstamo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import { format, addDays, isWeekend } from "date-fns";

export default {
  name: "ListaHerramientas",
  data() {
    return {
      herramientas: [],
      isLoggedIn: false,
      categoriaSeleccionada: "",
      categorias: [],
      fechaHoy: this.obtenerFechaHoy(),
      fechaMaximaPermitida: this.calcularFechaMaxima()
    };
  },
  computed: {
    herramientasFiltradas() {
      if (!this.categoriaSeleccionada) return this.herramientas;
      return this.herramientas.filter(
        (h) => h.categoria.nombre === this.categoriaSeleccionada
      );
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoggedIn = true;
    }, 2000);

    apiService.getHerramientas()
      .then((response) => {
        const data = response.data.map((herramienta) => {
          herramienta.fechaFormateada = format(
            new Date(herramienta.fechaAgregado),
            "dd/MM/yyyy"
          );
          herramienta.prestamoSolicitado = false;
          herramienta.cantidadSolicitada = 1;
          herramienta.fechaDevolucion = "";
          return herramienta;
        });

        this.herramientas = data;
        this.categorias = [...new Set(data.map((h) => h.categoria.nombre))];
      })
      .catch((error) => {
        console.error("Error al cargar herramientas:", error);
      });
  },
  methods: {
    obtenerFechaHoy() {
      const hoy = new Date();
      return format(hoy, "yyyy-MM-dd");
    },
    calcularFechaMaxima() {
      const hoy = new Date();
      let diasHabiles = 0;
      let contador = 1;
      while (diasHabiles < 3) {
        const dia = addDays(hoy, contador);
        if (!isWeekend(dia)) diasHabiles++;
        contador++;
      }
      return format(addDays(hoy, contador - 1), "yyyy-MM-dd");
    },
    getUsuarioId() {
      return 1;
    },
    solicitarPrestamo(herramienta) {
      herramienta.prestamoSolicitado = true;
      this.herramientaSeleccionada = herramienta;
      if (herramienta.stock <= 0) {
        alert("No hay stock disponible para préstamo.");
      }
    },
    confirmarPrestamo(herramienta) {
      if (!herramienta.fechaDevolucion) {
        alert("Por favor, selecciona una fecha de devolución.");
        return;
      }

      if (herramienta.fechaDevolucion > this.fechaMaximaPermitida) {
        alert("La fecha de devolución debe ser dentro de los próximos 3 días hábiles.");
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

      apiService
        .registrarPrestamo(prestamo)
        .then(() => {
          const nuevoStock = herramienta.stock - herramienta.cantidadSolicitada;
          const herramientaActualizada = {
            ...herramienta,
            stock: nuevoStock,
          };

          return apiService.actualizarHerramienta(
            herramienta.id,
            herramientaActualizada
          );
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

.filtro-categoria {
  position: absolute;
  top: 18%;
  left: 20px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
}

.filtro-categoria label {
  font-size: 14px;
}

.filtro-categoria select {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.filtro-categoria select:focus {
  outline: none;
  box-shadow: 0 0 5px #a0d683;
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
  background-color: #72bf78;
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
