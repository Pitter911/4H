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
      isLoggedIn: false, // Verifica si el usuario está autenticado (puedes manejar esto con Vuex o un sistema de autenticación)
    };
  },
  mounted() {
    // Simulando inicio de sesión
    // Normalmente esto lo harías con un sistema de autenticación
    setTimeout(() => {
      this.isLoggedIn = true;  // Cambiar estado para simular que el usuario ha iniciado sesión
    }, 2000); // Simulamos un retraso de 2 segundos (solo para demostración)

    apiService.getHerramientas()
      .then((response) => {
        this.herramientas = response.data.map(herramienta => {
          // Formatear la fecha
          herramienta.fechaFormateada = format(new Date(herramienta.fechaAgregado), 'dd/MM/yyyy');
          herramienta.prestamoSolicitado = false; // Inicializamos si se ha solicitado el préstamo
          herramienta.cantidadSolicitada = 1; // Establecemos la cantidad por defecto
          return herramienta;
        });
      })
      .catch((error) => {
        console.error("Error al cargar herramientas:", error);
      });
  },
  methods: {
    solicitarPrestamo(herramienta) {
      // Marca que se ha solicitado el préstamo
      herramienta.prestamoSolicitado = true;
      // Deshabilitar botón de préstamo si el stock es 0
      if (herramienta.stock <= 0) {
        alert("No hay stock disponible para préstamo.");
      }
    },
    confirmarPrestamo(herramienta) {
      // Verificar que la cantidad solicitada es válida
      if (herramienta.cantidadSolicitada <= 0 || herramienta.cantidadSolicitada > herramienta.stock) {
        alert("Cantidad no válida.");
        return;
      }

      // Reducir el stock de la herramienta
      herramienta.stock -= herramienta.cantidadSolicitada;

      // Realizar la solicitud del préstamo (enviar al backend para persistir los cambios)
      apiService.solicitarPrestamo(herramienta.id, herramienta.cantidadSolicitada)
        .then(() => {
          alert("Préstamo confirmado");
          // Resetear la cantidad solicitada y estado de solicitud
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
