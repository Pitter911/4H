<template>
    <navbarAdmin />
    <AgregarHerramienta />
    <editarHerramienta />
    <actualizarInventario />
</template>
<script setup>
import navbarAdmin from '@/components/navbar/Administradores/navbarAdmin.vue'
import AgregarHerramienta from '@/components/herramientasAdmin/agregarHerramienta.vue'
import editarHerramienta from '@/components/herramientasAdmin/editarHerramienta.vue'
import actualizarInventario from '@/components/herramientasAdmin/actualizarInventario.vue'
</script>