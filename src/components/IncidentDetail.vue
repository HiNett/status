<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div class="p-6" v-if="incident">
          <div class="flex justify-between items-start">
            <h2 class="text-2xl font-bold text-white">{{ incident.title }}</h2>
            <button 
              @click="$router.push('/')"
              class="px-4 py-2 bg-[#42b883] text-white rounded-md hover:bg-[#3aa876] transition-colors"
            >
              Retour
            </button>
          </div>
          
          <div class="mt-6 text-gray-300">
            <p>{{ incident.description }}</p>
            <div class="mt-4">
              <h3 class="text-lg font-semibold mb-2">Mises à jour</h3>
              <div class="space-y-4">
                <div v-for="update in incident.updates" :key="update.date" 
                     class="border-l-2 border-[#42b883] pl-4 py-2">
                  <p class="text-sm text-gray-400">{{ formatDateTime(update.date) }}</p>
                  <p class="mt-1">{{ update.message }}</p>
                  <p class="text-sm text-gray-400 mt-1">{{ update.details }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-400">
          Chargement des détails de l'incident...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncidentDetail',
  data() {
    return {
      incident: null
    }
  },
  methods: {
    formatDateTime(date) {
      return new Date(date).toLocaleString('fr-FR')
    }
  },
  created() {
    // Simulons la récupération des données de l'incident
    const incidentId = this.$route.params.id
    // Pour l'exemple, on simule un appel API
    setTimeout(() => {
      this.incident = {
        id: incidentId,
        title: 'Latence élevée Game 01',
        description: 'Incident en cours affectant les performances du serveur',
        updates: [
          {
            date: new Date('2024-03-20 15:30'),
            message: 'Résolution en cours - Identification de la cause',
            details: 'Problème de latence sur la base de données principale'
          },
          {
            date: new Date('2024-03-20 15:00'),
            message: 'Impact identifié - Temps de réponse supérieur à 2000ms',
            details: 'Impact sur 30% des utilisateurs'
          }
        ]
      }
    }, 0)
  }
}
</script>

<style scoped>
.incident-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 