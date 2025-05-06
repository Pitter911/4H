<template>
  <component :is="navbarComponent" />
  <div class="main-content">
    <router-view />
  </div>
</template>

<script setup>
// ... (tu código ya está bien)
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background: linear-gradient(90deg, #2196f3, #6a11cb);
  color: white;
  min-height: 100vh;
}

.main-content {
  padding-top: 70px; /* Agrega espacio para que no se esconda debajo de la navbar */
}
</style>
