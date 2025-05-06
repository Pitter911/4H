<template>
  <h1 class="titulo">Lista de Herramientas</h1>
  <div class="lista-herramientas">
    <div class="herramientas-container">
      <div 
        v-for="herramienta in herramientas" 
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
        <p><strong>Stock:</strong> {{ herramienta.stock }}</p>
        <p><strong>Agregado el:</strong> {{ herramienta.fechaFormateada }}</p>
        
        <!-- Botón para solicitar préstamo -->
        <button 
          v-if="isLoggedIn" 
          @click="solicitarPrestamo(herramienta)" 
          :disabled="herramienta.stock <= 0"
        >
          Solicitar Préstamo
        </button>

        <!-- Formulario para modificar cantidad de préstamo -->
        <div v-if="herramienta.prestamoSolicitado">
          <p><strong>Cantidad solicitada:</strong> 
            <input 
              v-model.number="herramienta.cantidadSolicitada" 
              type="number" 
              min="1" 
              :max="herramienta.stock"
            />
          </p>
          <button class="confirmar" @click="confirmarPrestamo(herramienta)">Confirmar Préstamo</button>
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
      isLoggedIn: false, 
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoggedIn = true; 
    }, 2000); 

    apiService.getHerramientas()
      .then((response) => {
        this.herramientas = response.data.map(herramienta => {
          herramienta.fechaFormateada = format(new Date(herramienta.fechaAgregado), 'dd/MM/yyyy');
          herramienta.prestamoSolicitado = false;
          herramienta.cantidadSolicitada = 1;
          return herramienta;
        });
      })
      .catch((error) => {
        console.error("Error al cargar herramientas:", error);
      });
  },
  methods: {
    solicitarPrestamo(herramienta) {
      herramienta.prestamoSolicitado = true;
      if (herramienta.stock <= 0) {
        alert("No hay stock disponible para préstamo.");
      }
    },
    confirmarPrestamo(herramienta) {
      if (herramienta.cantidadSolicitada <= 0 || herramienta.cantidadSolicitada > herramienta.stock) {
        alert("Cantidad no válida.");
        return;
      }

      herramienta.stock -= herramienta.cantidadSolicitada;

      apiService.solicitarPrestamo(herramienta.id, herramienta.cantidadSolicitada)
        .then(() => {
          alert("Préstamo confirmado");
          herramienta.prestamoSolicitado = false;
          herramienta.cantidadSolicitada = 1;
        })
        .catch((error) => {
          console.error("Error al confirmar préstamo:", error);
        });
    }
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

/* Estilo de los botones */
button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  background: linear-gradient(90deg, #2196f3, #21cbf3); /* Gradiente de fondo */
  color: white;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: linear-gradient(90deg, #2196f3, #21cbf3); /* Mantener gradiente al hacer hover */
  transform: scale(1.05);
}

button:active:not(:disabled) {
  background-color: #A0D683;
}

/* Botón confirmar */
button.confirmar {
  background: linear-gradient(90deg, #FEFF9F, #F2C700); /* Amarillo suave a dorado */
}

button.confirmar:hover {
  background: linear-gradient(90deg, #F8E450, #F2C700); /* Amarillo más fuerte */
}

button.confirmar:active {
  background: linear-gradient(90deg, #F2C700, #E6A100); /* Un amarillo más oscuro */
}

/* Estilos para el input de cantidad solicitada */
input[type="number"] {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid #72BF78; /* Un borde verde suave */
  background: linear-gradient(90deg, #2196f3, #21cbf3); /* Fondo gradiente */
  color: white;
  width: 100%;
  max-width: 200px;
  margin: 10px 0;
  transition: background-color 0.3s ease;
}

input[type="number"]:focus {
  outline: none;
  background: linear-gradient(90deg, #2196f3, #21cbf3); /* Mantener el gradiente al enfocarse */
  border-color: #72BF78; /* Resaltar borde verde */
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
</style>
