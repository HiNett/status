<template>
  <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <div class="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
        <h3 class="text-orange-300 font-semibold mb-4">Incidents en cours</h3>
        <div class="space-y-4">
          <div v-for="incident in activeIncidents" 
               :key="incident.id"
               class="border-l-2 border-orange-500/50 pl-4">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-white font-medium">{{ incident.title }}</h4>
                <p class="text-gray-400 text-sm mt-1">
                  Début: {{ formatDateTime(incident.startDate) }}
                </p>
                <p class="text-gray-400 text-sm">
                  Serveurs affectés: {{ incident.affectedServers.join(', ') }}
                </p>
              </div>
              <button 
                @click="$router.push(`/incident/${incident.id}`)"
                class="px-3 py-1 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-md"
              >
                Détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const activeIncidents = [
  {
    id: 'INC-2024-001',
    status: 'en-cours',
    title: 'Latence élevée Game 01',
    startDate: new Date('2024-03-20 14:45'),
    affectedServers: ['Game 01']
  }
]

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR')
}
</script> 