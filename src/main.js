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
import AdminAuth from './components/AdminAuth.vue'
import AdminDashboard from './components/AdminDashboard.vue'

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
      path: '/admin',
      component: AdminAuth
    },
    {
      path: '/admin/dashboard',
      component: AdminDashboard
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
