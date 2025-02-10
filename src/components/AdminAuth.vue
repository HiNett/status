<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">
          Administration <span class="text-[#42b883]">FPHT Status</span>
        </h1>
      </div>

      <!-- Formulaire d'inscription (affiché uniquement s'il n'y a pas d'admin) -->
      <div v-if="!hasAdmin" class="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-white mb-6">Création du compte administrateur</h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300">Nom d'utilisateur</label>
            <input 
              v-model="registerForm.username"
              type="text"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">Email</label>
            <input 
              v-model="registerForm.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">Mot de passe</label>
            <input 
              v-model="registerForm.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
            <input 
              v-model="registerForm.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <button 
            type="submit"
            class="w-full bg-[#42b883] text-white rounded-md py-2 hover:bg-[#3aa876] transition-colors"
          >
            Créer le compte
          </button>
        </form>
      </div>

      <!-- Formulaire de connexion -->
      <div v-else class="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-white mb-6">Connexion administrateur</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300">Nom d'utilisateur</label>
            <input 
              v-model="loginForm.username"
              type="text"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">Mot de passe</label>
            <input 
              v-model="loginForm.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
          </div>
          <button 
            type="submit"
            class="w-full bg-[#42b883] text-white rounded-md py-2 hover:bg-[#3aa876] transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>

      <!-- Message d'erreur -->
      <div v-if="error" class="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { API } from '../config/api'

const router = useRouter()
const hasAdmin = ref(false)
const error = ref('')

const loginForm = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Vérifie s'il existe déjà un admin
onMounted(async () => {
  try {
    const response = await fetch(API.ADMIN.CHECK)
    const data = await response.json()
    hasAdmin.value = data.hasAdmin
  } catch (err) {
    error.value = "Erreur lors de la vérification du statut administrateur"
  }
})

const handleRegister = async () => {
  error.value = ''
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = "Les mots de passe ne correspondent pas"
    return
  }

  try {
    const response = await fetch(API.ADMIN.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || "Erreur lors de l'inscription")
    }

    const data = await response.json()
    // Stocker le token dans le localStorage
    localStorage.setItem('admin_token', data.token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message
  }
}

const handleLogin = async () => {
  error.value = ''
  
  try {
    const response = await fetch(API.ADMIN.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginForm.value.username,
        password: loginForm.value.password
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || "Erreur lors de la connexion")
    }

    const data = await response.json()
    // Stocker le token dans le localStorage
    localStorage.setItem('admin_token', data.token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script> 