<template>
  <div class="perfil-usuario">
    <h1>Perfil de Usuario</h1>
    <div class="info">
      <p><strong>Nombre:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerfilUsuario",
  data() {
    return {
      user: {
        name: "Juan Pérez", // Puedes reemplazarlo con datos dinámicos
        email: "juan.perez@example.com",
        password: "********", // Por seguridad, no mostrar la contraseña real
      },
    };
  },
};
</script>

<style scoped>
.perfil-usuario {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.perfil-usuario h1 {
  text-align: center;
  margin-bottom: 20px;
}

.perfil-usuario .info p {
  margin: 10px 0;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .perfil-usuario {
    padding: 15px;
    font-size: 0.9rem;
  }
}
</style>