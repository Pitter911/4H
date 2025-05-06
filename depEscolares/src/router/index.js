import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Nuevas rutas agregadas
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/autenticacion/loginFrom.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/autenticacion/register.vue'),
    },
    {
      path: '/navbarAlumno',
      name: 'navbarAlumno',
      component: () => import('@/components/navbar/Alumnos/navbarAlumno.vue'),
    },
    {
      path: '/herramientas',
      name: 'herramientas',
      component: () => import('@/components/Herramientas/listaHerramientas.vue'),
    },
    {
      path: '/herramientas/admin',
      name: 'herramientasAdmin',
      component: () => import('@/components/herramientasAdmin/agregarHerramienta.vue'),
    },
    {
      path: '/prestamos',
      name: 'prestamos',
      component: () => import('@/components/prestamos/formularioPrestamos.vue'),
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/components/Usuarios/listaUsuarios.vue'),
    },
    {
      path: '/loginInitial',
      name: 'loginInitial',
      component: () => import('@/components/autenticacion/loginInitial.vue'),
    },

    //rutas publicas
    {
      path: '/loginInitialV',
      name: 'loginInitialV',
      component: () => import('@/views/publico/loginInitial.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/publico/home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/publico/login.vue'),
    },
    {
      path: '/NotFound',
      name: 'NotFound',
      component: () => import('@/views/publico/NotFound.vue'),
    },

    //rutas de alumno
    {
      path: '/dashboardAlumno',
      name: 'dashboardAlumno',
      component: () => import('@/views/alumno/dashboardAlumno.vue'),
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('@/views/alumno/historial.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/views/alumno/perfil.vue'),
    },
    {
      path: '/prestamos',
      name: 'prestamos',
      component: () => import('@/views/alumno/prestamos.vue'),
    },
    //rutas de admin
    {
      path: '/dashboardAdmin',
      name: 'dashboardAdmin',
      component: () => import('@/views/administrador/dashboardAdmin.vue'),
    },
    {
      path: '/gestionHerramientas',
      name: 'gestionHerramientas',
      component: () => import('@/views/administrador/gestionHerramientas.vue'),
    },
    {
      path: '/gestionUsuarios',
      name: 'gestionUsuarios',
      component: () => import('@/views/administrador/gestionUsuarios.vue'),
    },
    {
      path: '/historialGlobal',
      name: 'historialGlobal',
      component: () => import('@/views/administrador/historialGlobal.vue'),
    },
    {
      path: '/perfilAdmin',
      name: 'perfilAdmin',
      component: () => import('@/views/administrador/perfilAdmin.vue'),
    }
  ],
})

export default router