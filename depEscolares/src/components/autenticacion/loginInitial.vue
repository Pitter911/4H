<template>
  <div class="login-initial">
    <div class="content">
      <h1>Bienvenido a Escolares</h1>
      <p>¿Qué deseas hacer?</p>
      <div class="buttons">
        <button @click="navigateTo('login')">Iniciar Sesión</button>
        <button @click="navigateTo('register')">Registrarte</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginInitial",
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped>
.login-initial {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  padding: 1.5rem;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  color: white;
  text-align: center;
}

.content {
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #f0f0f0;
}

.buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  color: #4facfe;
  background: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: #e3f2fd;
  transform: translateY(-3px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}
</style>