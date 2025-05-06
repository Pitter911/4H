<template>
  <!-- Navbar dinámica según el rol -->
  <component :is="navbarComponent" />

  <!-- Aquí se renderiza la vista actual -->
  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Importar los 3 tipos de navbar
import NavbarDefault from '@/components/navbar/navbarDefault.vue'
import NavbarAlumno from '@/components/navbar/Alumnos/navbarAlumno.vue'
import NavbarAdmin from '@/components/navbar/Administradores/navbarAdmin.vue'

// Simulación de cómo obtendrías el rol (reemplaza con Vuex o Pinia si usas)
const route = useRoute()

// Función para obtener el rol desde localStorage, Vuex o API
const getUserRole = () => {
  // Puedes guardar el rol después del login como 'alumno', 'admin', o null
  return localStorage.getItem('rol') || 'default'
}

// Computed para decidir qué navbar mostrar
const navbarComponent = computed(() => {
  const role = getUserRole()

  if (role === 'alumno') return NavbarAlumno
  if (role === 'admin') return NavbarAdmin
  return NavbarDefault
})
</script>

<style>

/* Estilos globales opcionales */
body {
  margin: 0;
  font-family: sans-serif;
  background: linear-gradient(90deg, #2196f3, #6a11cb); /* Gradiente modificado */
  color: white; /* Asegúrate de que el texto sea legible */
  min-height: 100vh; /* Asegura que el fondo cubra toda la pantalla */
}

</style>