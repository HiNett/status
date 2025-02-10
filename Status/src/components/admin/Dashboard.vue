<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <!-- Barre de navigation admin -->
    <nav class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-[#42b883] font-bold text-xl">Admin Dashboard</span>
          </div>
          <div class="flex items-center">
            <button 
              @click="logout"
              class="text-gray-400 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Gestion des serveurs -->
      <div class="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 class="text-xl font-bold text-white mb-4">Gestion des serveurs</h2>
        
        <!-- Formulaire d'ajout -->
        <form @submit.prevent="addServer" class="mb-6">
          <div class="flex gap-4">
            <input 
              v-model="newServer.name"
              type="text"
              placeholder="Nom du serveur"
              class="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#42b883]"
            />
            <button 
              type="submit"
              class="bg-[#42b883] text-white px-4 py-2 rounded hover:bg-[#3aa876] transition-colors"
            >
              Ajouter
            </button>
          </div>
        </form>

        <!-- Liste des serveurs -->
        <div class="space-y-4">
          <div 
            v-for="server in servers" 
            :key="server.id"
            class="flex justify-between items-center p-4 bg-gray-700 rounded"
          >
            <span class="text-white">{{ server.name }}</span>
            <button 
              @click="deleteServer(server.id)"
              class="text-red-400 hover:text-red-300 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- Autres sections du dashboard -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const servers = ref([])
const newServer = ref({ name: '' })

// Charger les serveurs
const loadServers = async () => {
  try {
    const response = await fetch('/api/admin/servers', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      }
    })
    if (response.ok) {
      servers.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des serveurs:', error)
  }
}

// Ajouter un serveur
const addServer = async () => {
  try {
    const response = await fetch('/api/admin/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(newServer.value)
    })
    
    if (response.ok) {
      await loadServers()
      newServer.value.name = ''
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du serveur:', error)
  }
}

// Supprimer un serveur
const deleteServer = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce serveur ?')) return
  
  try {
    const response = await fetch(`/api/admin/servers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      }
    })
    
    if (response.ok) {
      await loadServers()
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du serveur:', error)
  }
}

// Déconnexion
const logout = () => {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}

onMounted(loadServers)
</script> 