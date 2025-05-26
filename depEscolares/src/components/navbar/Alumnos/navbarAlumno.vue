<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/tecnm.png" alt="Logotipo" />
    </div>
    <div class="navbar-search">
      <input
        type="text"
        placeholder="Buscar..."
        v-model="searchQuery"
        @input="onSearch"
        aria-label="Buscar"
      />
    </div>
    <ul class="navbar-links">
      <li v-for="item in navItems" :key="item.href">
        <a :href="item.href">
          <span :class="item.iconClass" v-html="item.icon"></span>
          {{ item.label }}
        </a>
      </li>
    </ul>
    <button class="navbar-toggle" @click="toggleMenu" aria-label="Abrir menú">
      ☰
    </button>
    <div class="navbar-menu" v-if="menuOpen">
      <ul>
        <li v-for="item in navItems" :key="item.href + '-menu'">
          <a :href="item.href" @click="toggleMenu">{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
const icons = {
  historial: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>`,
  prestamos: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h10" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M18 16.5v1.5l.5 .5" /></svg>`,
  cuenta: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>`
};

export default {
  data() {
    return {
      searchQuery: '',
      menuOpen: false,
      navItems: [
        { label: 'Historial', href: '/historial', icon: icons.historial, iconClass: 'icon-historial' },
        { label: 'Préstamos Recientes', href: '/prestamos', icon: icons.prestamos, iconClass: 'icon-prestamos' },
        { label: 'Cuenta', href: '/perfil', icon: icons.cuenta, iconClass: 'icon-cuenta' }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log('Buscando:', this.searchQuery);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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

.icon-historial,
.icon-prestamos,
.icon-cuenta {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-historial svg,
.icon-prestamos svg,
.icon-cuenta svg {
  margin-bottom: 2px;
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