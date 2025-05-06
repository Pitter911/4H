<template>
  <div class="lista-usuarios">
    <h1>Gestión de Usuarios</h1>
    <div v-if="isAdmin">
      <table class="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.email }}</td>
            <td>
              <select v-model="usuario.rol" @change="asignarRol(usuario)">
                <option v-for="rol in roles" :key="rol" :value="rol">{{ rol }}</option>
              </select>
            </td>
            <td>
              <button @click="eliminarUsuario(usuario.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No tienes permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: true, // Cambiar a false para probar restricciones
      usuarios: [
        { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Usuario" },
        { id: 2, nombre: "Ana López", email: "ana@example.com", rol: "Administrador" },
      ],
      roles: ["Usuario", "Administrador"],
    };
  },
  methods: {
    asignarRol(usuario) {
      // Lógica para asignar rol (puedes conectarlo a una API)
      console.log(`Rol asignado a ${usuario.nombre}: ${usuario.rol}`);
    },
    eliminarUsuario(id) {
      // Lógica para eliminar usuario (puedes conectarlo a una API)
      this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
      console.log(`Usuario con ID ${id} eliminado`);
    },
  },
};
</script>

<style scoped>
.lista-usuarios {
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  padding: 20px;
  border-radius: 8px;
  color: white;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.usuarios-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.usuarios-table th,
.usuarios-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.usuarios-table th {
  background-color: rgba(255, 255, 255, 0.2);
}

.usuarios-table select {
  padding: 5px;
  border-radius: 4px;
}

.usuarios-table button {
  padding: 5px 10px;
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.usuarios-table button:hover {
  background-color: #ff1744;
}

@media (max-width: 768px) {
  .usuarios-table {
    font-size: 14px;
  }

  .usuarios-table th,
  .usuarios-table td {
    padding: 8px;
  }
}
</style>