<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 class="text-2xl font-bold text-white mb-6">Connexion administrateur</h2>
        
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-gray-400 mb-2">Email</label>
            <input 
              v-model="form.email"
              type="email"
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#42b883]"
              required
            />
          </div>
          
          <div>
            <label class="block text-gray-400 mb-2">Mot de passe</label>
            <input 
              v-model="form.password"
              type="password"
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#42b883]"
              required
            />
          </div>

          <button 
            type="submit"
            class="w-full bg-[#42b883] text-white py-2 px-4 rounded hover:bg-[#3aa876] transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})

const login = async () => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      const { token } = await response.json()
      localStorage.setItem('admin_token', token)
      router.push('/admin/dashboard')
    } else {
      alert('Email ou mot de passe incorrect')
    }
  } catch (error) {
    alert('Une erreur est survenue')
  }
}
</script> 