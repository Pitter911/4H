<template>
  <div class="herramientas-container">
    <!-- Barra lateral de categorías -->
    <div class="categorias-sidebar">
      <h3>Categorías</h3>
      <ul>
        <li v-for="categoria in categorias" :key="categoria" @click="filtrarPorCategoria(categoria)">
          {{ categoria }}
        </li>
      </ul>
    </div>

    <!-- Listado de herramientas -->
    <div class="herramientas-lista">
      <h1 class="titulo">Lista de Herramientas</h1>
      <div v-for="herramienta in herramientasFiltradas" :key="herramienta.id" class="herramienta-card">
        <img :src="herramienta.imagenURL" alt="Imagen de la herramienta" class="herramienta-imagen" />
        <h2>{{ herramienta.nombre }}</h2>
        <p>{{ herramienta.descripcion }}</p>
        <p><strong>Stock:</strong> {{ herramienta.stock }}</p>
        <p><strong>Agregado el:</strong> {{ herramienta.fechaFormateada }}</p>
        <button v-if="isLoggedIn" @click="solicitarPrestamo(herramienta)" :disabled="herramienta.stock <= 0">
          Solicitar Préstamo
        </button>

        <div v-if="herramienta.prestamoSolicitado" class="prestamo-form">
          <div class="campo">
            <label><strong>Cantidad solicitada:</strong></label>
            <input v-model.number="herramienta.cantidadSolicitada" type="number" min="1" :max="herramienta.stock" />
          </div>

          <div class="campo">
            <label><strong>Fecha de devolución:</strong></label>
            <input type="date" v-model="herramienta.fechaDevolucion" :min="fechaHoy" />
          </div>

          <button @click="confirmarPrestamo(herramienta)">
            Confirmar Préstamo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import { format } from "date-fns";

export default {
  name: "ListaHerramientas",
  data() {
    return {
      herramientas: [],
      herramientasFiltradas: [],
      categorias: ["Electrónica", "Jardinería", "Construcción"], // Ejemplo de categorías
      categoriaSeleccionada: null,
      isLoggedIn: false,
      fechaHoy: format(new Date(), "yyyy-MM-dd"),
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoggedIn = true;
    }, 2000);

    apiService
      .getHerramientas()
      .then((response) => {
        this.herramientas = response.data.map((herramienta) => ({
          ...herramienta,
          fechaFormateada: format(new Date(herramienta.fechaAgregado), "dd/MM/yyyy"),
          prestamoSolicitado: false,
          cantidadSolicitada: 1,
          fechaDevolucion: "",
        }));
        this.herramientasFiltradas = this.herramientas; // Al principio muestra todas las herramientas
      })
      .catch((error) => {
        console.error("Error al cargar herramientas:", error);
      });
  },
  methods: {
    filtrarPorCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
      if (categoria === "Todos") {
        this.herramientasFiltradas = this.herramientas;
      } else {
        this.herramientasFiltradas = this.herramientas.filter(herramienta => herramienta.categoria === categoria);
      }
    },

    getUsuarioId() {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      return usuario ? usuario.id : null;
    },

    solicitarPrestamo(herramienta) {
      herramienta.prestamoSolicitado = true;
    },

    confirmarPrestamo(herramienta) {
      const errores = [];

      if (!herramienta.id) errores.push("ID inválido de la herramienta.");
      if (!herramienta.fechaDevolucion) errores.push("Selecciona una fecha de devolución.");
      if (herramienta.cantidadSolicitada > herramienta.stock)
        errores.push("No hay suficiente stock disponible.");

      if (errores.length > 0) {
        alert(errores.join("\n"));
        return;
      }

      const prestamo = {
        usuario: { id: this.getUsuarioId() },
        herramienta: { id: herramienta.id },
        fechaPrestamo: new Date().toISOString().split("T")[0],
        fechaDevolucion: herramienta.fechaDevolucion,
        estado: "pendiente",
      };

      apiService
        .registrarPrestamo(prestamo)
        .then(() => {
          const nuevoStock = herramienta.stock - herramienta.cantidadSolicitada;
          return apiService.actualizarHerramienta(herramienta.id, {
            ...herramienta,
            stock: nuevoStock,
          });
        })
        .then(() => {
          alert("✅ Préstamo confirmado y stock actualizado.");
          herramienta.prestamoSolicitado = false;
          herramienta.stock -= herramienta.cantidadSolicitada;
        })
        .catch((error) => {
          console.error("Error al procesar el préstamo:", error);
        });
    },
  },
};
</script>

<style scoped>
.herramientas-container {
  display: flex;
  justify-content: space-between;
}

.categorias-sidebar {
  width: 200px;
  background-color: #333;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

.categorias-sidebar h3 {
  margin-top: 0;
}

.categorias-sidebar ul {
  list-style: none;
  padding: 0;
}

.categorias-sidebar li {
  margin: 10px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.categorias-sidebar li:hover {
  color: #72bf78;
}

.herramientas-lista {
  flex-grow: 1;
  padding: 20px;
  max-width: 80%;
}

.titulo {
  font-size: 24px;
  color: white;
}

.herramienta-card {
  background: rgba(255, 255, 255, 0.25);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33% - 20px);
  max-width: calc(33% - 20px);
  box-sizing: border-box;
}

.herramienta-card h2,
.herramienta-card p {
  color: #fff;
}

.herramienta-imagen {
  width: 100%;
  max-width: 150px;
  height: auto;
  margin: 0 auto 16px;
  border-radius: 8px;
}

.prestamo-form {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff33;
  border-radius: 8px;
}

.campo {
  margin-bottom: 10px;
  text-align: left;
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
  background-color: #ffffffb2;
  color: #333;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  box-shadow: 0 0 4px #a0d683;
}

@media (max-width: 768px) {
  .herramienta-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
