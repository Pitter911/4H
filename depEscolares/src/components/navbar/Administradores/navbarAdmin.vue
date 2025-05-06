<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/tecnm.png" alt="Logotipo" />
    </div>
    <div class="navbar-search">
      <input type="text" placeholder="Buscar..." v-model="searchQuery" />
    </div>
    <ul class="navbar-menu">
      <li @click="editTools">Editar Herramientas</li>
      <li @click="viewGlobalHistory">Historial Global</li>
      <li @click="manageUsers">Gestión Usuarios</li>
      <li @click="viewAccount">Cuenta</li>
    </ul>
    <button class="navbar-toggle" @click="toggleMenu">
      ☰
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      isMenuOpen: false,
    };
  },
  methods: {
    editTools() {
      console.log("Editar Herramientas");
    },
    viewGlobalHistory() {
      console.log("Historial Global");
    },
    manageUsers() {
      console.log("Gestión Usuarios");
    },
    viewAccount() {
      console.log("Cuenta");
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  color: white;
  flex-wrap: wrap;
}

.navbar-logo img {
  height: 40px;
}

.navbar-search input {
  padding: 5px;
  border: none;
  border-radius: 4px;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 15px;
}

.navbar-menu li {
  cursor: pointer;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: linear-gradient(90deg, #2196f3, #21cbf3);
    position: absolute;
    top: 60px;
    left: 0;
    padding: 10px 0;
  }

  .navbar-menu li {
    padding: 10px;
    text-align: center;
  }

  .navbar-menu.open {
    display: flex;
  }

  .navbar-toggle {
    display: block;
  }
}
</style>