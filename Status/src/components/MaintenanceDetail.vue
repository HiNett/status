<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div class="p-6" v-if="maintenance">
          <div class="flex justify-between items-start">
            <h2 class="text-2xl font-bold text-white">{{ maintenance.title }}</h2>
            <button 
              @click="$router.push('/')"
              class="px-4 py-2 bg-[#42b883] text-white rounded-md hover:bg-[#3aa876] transition-colors"
            >
              Retour
            </button>
          </div>
          
          <div class="mt-6 text-gray-300">
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="text-sm font-medium text-gray-400">Début prévu</h3>
                <p class="mt-1 text-white">{{ formatDateTime(maintenance.startDate) }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-400">Fin prévue</h3>
                <p class="mt-1 text-white">{{ formatDateTime(maintenance.endDate) }}</p>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-400">Serveurs concernés</h3>
              <ul class="mt-2 space-y-1">
                <li v-for="server in maintenance.affectedServers" 
                    :key="server"
                    class="text-white"
                >
                  {{ server }}
                </li>
              </ul>
            </div>

            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-400">Description</h3>
              <p class="mt-2 text-white">{{ maintenance.description }}</p>
            </div>

            <div v-if="maintenance.updates && maintenance.updates.length > 0">
              <h3 class="text-lg font-medium text-white mb-4">Mises à jour</h3>
              <div class="space-y-4">
                <div v-for="update in maintenance.updates" 
                     :key="update.date"
                     class="border-l-2 border-[#42b883] pl-4 py-2"
                >
                  <p class="text-sm text-gray-400">{{ formatDateTime(update.date) }}</p>
                  <p class="mt-1">{{ update.message }}</p>
                  <p class="text-sm text-gray-400 mt-1">{{ update.details }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-400">
          Chargement des détails de la maintenance...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR')
}

// Simulons la récupération des données de la maintenance
const maintenance = {
  id: 'MNT-2024-001',
  status: 'planifiée',
  title: 'Mise à jour majeure des serveurs',
  startDate: new Date('2024-03-25 03:00'),
  endDate: new Date('2024-03-25 05:00'),
  affectedServers: ['Game Panel', 'Game 01'],
  description: 'Mise à jour de sécurité et optimisations des performances. Cette maintenance inclut des correctifs importants et des améliorations de la stabilité du système.',
  updates: [
    {
      date: new Date('2024-03-20 10:00'),
      message: 'Planification de la maintenance',
      details: 'La maintenance a été programmée et validée par l\'équipe technique'
    }
  ]
}
</script> 