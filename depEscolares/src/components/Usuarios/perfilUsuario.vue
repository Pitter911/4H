<template>
  <div class="perfil-usuario">
    <h1>Perfil de Usuario</h1>
    <div class="info">
      <p><strong>Nombre:</strong> {{ user.nombre }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Rol:</strong> {{ user.rol }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerfilUsuario",
  data() {
    return {
      user: {
        nombre: "",
        email: "",
        rol: "",
      },
    };
  },
  mounted() {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);

        // Ajusta estos nombres según cómo se guardó el JSON
        this.user.nombre = usuario.nombre || usuario.usuario || "";
        this.user.email = usuario.email || "";
        this.user.rol = usuario.rol || "";
      } catch (e) {
        console.error("Error al leer el usuario del localStorage:", e);
      }
    }
  },
};
</script>

<style scoped>
.perfil-usuario {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 420px;
  min-width: 320px;
  padding: 2.5rem 2rem 2rem 2rem;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(120deg, #2196f3 0%, #21cbf3 100%);
  color: #333;
  border-radius: 22px;
  box-shadow: 0 10px 32px rgba(33, 150, 243, 0.18), 0 2px 8px rgba(0, 0, 0, 0.13);
  transition: box-shadow 0.3s, transform 0.2s;
}

.perfil-usuario:hover {
  box-shadow: 0 16px 40px rgba(33, 150, 243, 0.28), 0 4px 16px rgba(0, 0, 0, 0.18);
  transform: translate(-50%, -52%) scale(1.02);
}

.perfil-usuario h1 {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2.2rem;
  letter-spacing: 1.5px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 12px rgba(33, 203, 243, 0.22);
}

.perfil-usuario .info {
  width: 100%;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 24px 20px;
  box-shadow: 0 2px 8px rgba(33, 203, 243, 0.13);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.perfil-usuario .info p {
  margin: 0;
  font-size: 1.13rem;
  line-height: 1.7;
  border-bottom: 1.5px solid rgba(33, 150, 243, 0.13);
  padding-bottom: 10px;
  color: #222;
  font-weight: 500;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.perfil-usuario .info p:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.perfil-usuario .info strong {
  color: #1976d2;
  font-weight: 700;
  background: #ffe08233;
  padding: 2px 8px;
  border-radius: 6px;
  margin-right: 6px;
  font-size: 1.08rem;
}

@media (max-width: 600px) {
  .perfil-usuario {
    padding: 1.2rem 0.5rem;
    font-size: 0.98rem;
    max-width: 98vw;
    min-width: unset;
  }
  .perfil-usuario h1 {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
  .perfil-usuario .info {
    padding: 12px 6px;
    gap: 10px;
  }
}
</style>