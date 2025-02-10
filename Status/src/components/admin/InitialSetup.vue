<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 class="text-2xl font-bold text-white mb-6">Configuration initiale</h2>
        
        <form @submit.prevent="createAdmin" class="space-y-4">
          <div>
            <label class="block text-gray-400 mb-2">Nom d'utilisateur</label>
            <input 
              v-model="form.username"
              type="text"
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#42b883]"
              required
            />
          </div>
          
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
          
          <div>
            <label class="block text-gray-400 mb-2">Confirmer le mot de passe</label>
            <input 
              v-model="form.confirmPassword"
              type="password"
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#42b883]"
              required
            />
          </div>

          <button 
            type="submit"
            class="w-full bg-[#42b883] text-white py-2 px-4 rounded hover:bg-[#3aa876] transition-colors"
          >
            Créer le compte administrateur
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Vérifier s'il existe déjà un administrateur
onMounted(async () => {
  try {
    const response = await fetch('/api/admin/check')
    const { hasAdmin } = await response.json()
    
    if (hasAdmin) {
      router.push('/admin/login')
    }
  } catch (error) {
    console.error('Erreur lors de la vérification:', error)
  }
})

const createAdmin = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  try {
    const response = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      })
    })

    if (response.ok) {
      router.push('/admin/login')
    } else {
      const error = await response.json()
      alert(error.message)
    }
  } catch (error) {
    alert('Une erreur est survenue')
  }
}
</script> 