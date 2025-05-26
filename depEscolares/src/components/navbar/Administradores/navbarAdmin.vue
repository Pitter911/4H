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
  tools: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M11.992 21c-.728 -.003 -1.455 -.442 -1.667 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.882 .214 1.32 .95 1.317 1.684"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5"/></svg>`,
  history: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"/><path d="M10 12l4 0"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M6 21v-2a4 4 0 0 1 4 -4h2.5"/><path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M19.001 15.5v1.5"/><path d="M19.001 21v1.5"/><path d="M22.032 17.25l-1.299 .75"/><path d="M17.27 20l-1.3 .75"/><path d="M15.97 17.25l1.3 .75"/><path d="M20.733 20l1.3 .75"/></svg>`,
  account: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z"/><path d="M6.201 18.744a4 4 0 0 1 3.799 -2.744h4a4 4 0 0 1 3.798 2.741"/><path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"/></svg>`
};

export default {
  data() {
    return {
      searchQuery: '',
      menuOpen: false,
      navItems: [
        { label: 'Editar Herramientas', href: '/administrador/gestionHerramientas.vue', icon: icons.tools, iconClass: 'icon-tools' },
        { label: 'Historial Global', href: '/administrador/historialGlobal.vue', icon: icons.history, iconClass: 'icon-history' },
        { label: 'Gestión Usuarios', href: '/administrador/gestionUsuarios.vue', icon: icons.users, iconClass: 'icon-users' },
        { label: 'Cuenta', href: '/administrador/cuenta.vue', icon: icons.account, iconClass: 'icon-account' }
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

.icon-tools,
.icon-history,
.icon-users,
.icon-account {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-tools svg,
.icon-history svg,
.icon-users svg,
.icon-account svg {
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