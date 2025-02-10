<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">
          Dashboard <span class="text-[#42b883]">Administration</span>
        </h1>
        <button 
          @click="handleLogout"
          class="px-4 py-2 bg-red-500/20 text-red-300 rounded-md hover:bg-red-500/30 transition-colors"
        >
          Déconnexion
        </button>
      </div>

      <!-- Contenu du dashboard à venir -->
      <div class="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <p class="text-gray-300">Bienvenue dans votre espace administrateur</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('admin_token')
  if (!token) {
    router.push('/admin')
  }
})

const handleLogout = () => {
  localStorage.removeItem('admin_token')
  router.push('/admin')
}
</script> 