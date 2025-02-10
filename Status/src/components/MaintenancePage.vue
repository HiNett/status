<template>
  <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <div class="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
        <h3 class="text-blue-300 font-semibold mb-4">Maintenances planifiées</h3>
        <div class="space-y-4">
          <div v-for="maintenance in maintenances" 
               :key="maintenance.id"
               class="border-l-2 border-blue-500/50 pl-4">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-white font-medium">{{ maintenance.title }}</h4>
                <p class="text-gray-400 text-sm mt-1">
                  Prévu le {{ formatDateTime(maintenance.startDate) }}
                </p>
                <p class="text-gray-400 text-sm">
                  Durée estimée: {{ 
                    Math.round((maintenance.endDate - maintenance.startDate) / (1000 * 60)) 
                  }} minutes
                </p>
                <p class="text-gray-400 text-sm">
                  Serveurs concernés: {{ maintenance.affectedServers.join(', ') }}
                </p>
              </div>
              <button 
                @click="$router.push(`/maintenance/${maintenance.id}`)"
                class="px-3 py-1 text-sm bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-md"
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
const maintenances = [
  {
    id: 'MNT-2024-001',
    status: 'planifiée',
    title: 'Mise à jour majeure des serveurs',
    startDate: new Date('2024-03-25 03:00'),
    endDate: new Date('2024-03-25 05:00'),
    affectedServers: ['Game Panel', 'Game 01']
  }
]

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR')
}
</script> 