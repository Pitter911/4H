<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/tecnm.png" alt="Logotipo" />
    </div>
    <div class="navbar-search">
      <input type="text" placeholder="Buscar..." v-model="searchQuery" @input="onSearch" />
    </div>
    <ul class="navbar-links">
      <li><a href="#historial">Historial</a></li>
      <li><a href="#prestamos">Préstamos Recientes</a></li>
      <li><a href="#cuenta">Cuenta</a></li>
    </ul>
    <button class="navbar-toggle" @click="toggleMenu">
      ☰
    </button>
    <div class="navbar-menu" v-if="menuOpen">
      <ul>
        <li><a href="#historial" @click="toggleMenu">Historial</a></li>
        <li><a href="#prestamos" @click="toggleMenu">Préstamos Recientes</a></li>
        <li><a href="#cuenta" @click="toggleMenu">Cuenta</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      menuOpen: false,
    };
  },
  methods: {
    onSearch() {
      console.log('Buscando:', this.searchQuery);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
  border-radius: 5px;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.navbar-menu {
  display: none;
  flex-direction: column;
  background: #2196f3;
  position: absolute;
  top: 60px;
  right: 20px;
  border-radius: 5px;
  padding: 10px;
}

.navbar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  padding: 10px 0;
  display: block;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }
  .navbar-toggle {
    display: block;
  }
  .navbar-menu {
    display: flex;
  }
}
</style>