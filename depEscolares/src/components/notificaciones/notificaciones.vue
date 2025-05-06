<template>
  <div class="notificaciones">
    <div v-for="(mensaje, index) in mensajes" :key="index" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Notificaciones",
  data() {
    return {
      mensajes: [
        "Bienvenido al sistema.",
        "Recuerda completar tu perfil.",
        "Tienes nuevas notificaciones."
      ],
    };
  },
};
</script>

<style scoped>
.notificaciones {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mensaje {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.mensaje:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .notificaciones {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>