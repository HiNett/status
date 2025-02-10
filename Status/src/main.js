import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/Layout.vue'
import HomePage from './components/HomePage.vue'
import IncidentDetail from './components/IncidentDetail.vue'
import MaintenanceDetail from './components/MaintenanceDetail.vue'
import IncidentsPage from './components/IncidentsPage.vue'
import MaintenancePage from './components/MaintenancePage.vue'
import AdminLogin from './components/admin/Login.vue'
import AdminDashboard from './components/admin/Dashboard.vue'
import InitialSetup from './components/admin/InitialSetup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: HomePage,
          name: 'home'
        },
        {
          path: 'incidents',
          component: IncidentsPage,
          name: 'incidents'
        },
        {
          path: 'maintenance',
          component: MaintenancePage,
          name: 'maintenance'
        },
        {
          path: 'incident/:id',
          component: IncidentDetail,
          name: 'incident-detail'
        },
        {
          path: 'maintenance/:id',
          component: MaintenanceDetail,
          name: 'maintenance-detail'
        }
      ]
    },
    {
      path: '/admin/setup',
      component: InitialSetup,
      name: 'admin-setup'
    },
    {
      path: '/admin/login',
      component: AdminLogin,
      name: 'admin-login'
    },
    {
      path: '/admin/dashboard',
      component: AdminDashboard,
      name: 'admin-dashboard',
      meta: { requiresAuth: true }
    }
  ]
})

// Protection des routes admin
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('admin_token')) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
