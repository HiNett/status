<script setup>
import { ref } from 'vue'

// Tabs
const currentSection = ref('status') // 'status', 'incidents', 'maintenance'

// État des nodes
const expandedNodes = ref(new Set(['game-server'])) // IDs des nodes ouverts

const toggleNode = (nodeId) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId)
  } else {
    expandedNodes.value.add(nodeId)
  }
}

// Simulation des incidents/maintenances
const incidents = [
  {
    id: 'INC-2024-001',
    status: 'en-cours',
    title: 'Latence élevée Game 01',
    startDate: new Date('2024-03-20 14:45'),
    endDate: null,
    affectedServers: ['Game 01'],
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
      },
      {
        date: new Date('2024-03-20 14:45'),
        message: 'Incident détecté sur le serveur Game 01',
        details: 'Détection automatique par notre système de monitoring'
      }
    ]
  }
]

const maintenances = [
  {
    id: 'MNT-2024-001',
    status: 'planifiée',
    title: 'Mise à jour majeure des serveurs',
    startDate: new Date('2024-03-25 03:00'),
    endDate: new Date('2024-03-25 05:00'),
    affectedServers: ['Game Panel', 'Game 01'],
    description: 'Mise à jour de sécurité et optimisations',
    updates: []
  }
]

// Simulation d'un incident avec plusieurs mises à jour
const incidentUpdates = [
  {
    id: 'INC-2024-001',
    date: new Date('2024-03-20 15:30'),
    message: 'Résolution en cours - Identification de la cause',
    details: 'Problème de latence sur la base de données principale'
  },
  {
    id: 'INC-2024-001',
    date: new Date('2024-03-20 15:00'),
    message: 'Impact identifié - Temps de réponse supérieur à 2000ms',
    details: 'Impact sur 30% des utilisateurs'
  },
  {
    id: 'INC-2024-001',
    date: new Date('2024-03-20 14:45'),
    message: 'Incident détecté sur le serveur Game 01',
    details: 'Détection automatique par notre système de monitoring'
  }
]

const generateHistoryItem = (date) => {
  const random = Math.random()
  if (random > 0.9) {
    return {
      date,
      status: 'incident',
      incidentId: `INC-${date.getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
      title: 'Panne partielle du service',
      details: 'Temps de réponse dégradé'
    }
  } else if (random > 0.8) {
    return {
      date,
      status: 'maintenance',
      maintenanceId: `MNT-${date.getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
      title: 'Maintenance planifiée',
      details: 'Mise à jour des systèmes'
    }
  }
  return {
    date,
    status: 'normal'
  }
}

const nodes = [
  {
    name: 'Game Server',
    isOpen: true,
    servers: [
      {
        name: 'Game Panel',
        history: Array.from({ length: 90 }, (_, i) => 
          generateHistoryItem(new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000))
        )
      },
      {
        name: 'Game 01',
        history: Array.from({ length: 90 }, (_, i) => 
          generateHistoryItem(new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000))
        )
      }
    ]
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'normal': return 'bg-[#42b883]'
    case 'incident': return 'bg-orange-500'
    case 'maintenance': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR')
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'normal': return 'Opérationnel'
    case 'incident': return 'Incident'
    case 'maintenance': return 'Maintenance'
    default: return 'Pas de données'
  }
}
</script>

<template>
  <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Vue Status -->
    <div v-if="currentSection === 'status'">
      <!-- Barre d'alerte avec mises à jour -->
      <div class="mb-8 bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-orange-300 font-semibold">Incident en cours</h3>
          <button 
            class="px-3 py-1 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-md transition-colors"
            @click="$router.push(`/incident/${incidentUpdates[0].id}`)"
          >
            Détails de l'incident
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="(update, index) in incidentUpdates" :key="index" 
               class="text-orange-300/90 text-sm border-l-2 border-orange-500/50 pl-4 py-1">
            <p class="text-xs text-orange-300/70 mb-1">{{ formatDateTime(update.date) }}</p>
            <p>{{ update.message }}</p>
          </div>
        </div>
      </div>

      <!-- Système de nodes -->
      <div class="space-y-6">
        <div v-for="node in nodes" :key="node.name" class="bg-gray-800 rounded-lg border border-gray-700">
          <div 
            @click="toggleNode(node.name.toLowerCase().replace(' ', '-'))"
            class="p-4 flex items-center cursor-pointer hover:bg-gray-700/50 transition-colors"
          >
            <span class="text-[#42b883] text-xl font-semibold">{{ node.name }}</span>
            <span class="ml-2 text-gray-400">
              {{ expandedNodes.has(node.name.toLowerCase().replace(' ', '-')) ? '▼' : '▶' }}
            </span>
          </div>

          <div v-if="expandedNodes.has(node.name.toLowerCase().replace(' ', '-'))" 
               class="p-4 pt-0 space-y-6">
            <div v-for="server in node.servers" :key="server.name" class="border-t border-gray-700 pt-4">
              <h3 class="text-white text-lg mb-3">{{ server.name }}</h3>
              
              <!-- Historique sur 90 jours -->
              <div class="relative">
                <div class="flex gap-[2px] w-full">
                  <div
                    v-for="(day, index) in server.history"
                    :key="day.date"
                    :class="[
                      getStatusColor(day.status),
                      'h-8',
                      'flex-1',
                      'relative group',
                      index === 0 ? 'rounded-l' : '',
                      index === server.history.length - 1 ? 'rounded-r' : '',
                    ]"
                  >
                    <!-- Tooltip -->
                    <div
                      class="absolute bottom-full left-1/2 mb-2 w-[250px] -translate-x-1/2 hidden group-hover:block z-10"
                    >
                      <!-- Zone tampon pour le hover -->
                      <div class="absolute h-2 w-full bottom-0 translate-y-full"></div>
                      
                      <div class="bg-gray-900 text-sm rounded px-4 py-3 shadow-lg border border-gray-700">
                        <p class="text-white font-medium text-base">{{ formatDate(day.date) }}</p>
                        <p class="text-gray-400">{{ getStatusLabel(day.status) }}</p>
                        
                        <!-- Informations supplémentaires pour incidents et maintenances -->
                        <template v-if="day.status === 'incident' || day.status === 'maintenance'">
                          <div class="mt-3 pt-3 border-t border-gray-700">
                            <p class="text-white font-medium">{{ day.title }}</p>
                            <p class="text-gray-400 mt-2">{{ day.details }}</p>
                            <button 
                              @click="$router.push(`/${day.status}/${day[day.status + 'Id']}`)"
                              class="mt-3 text-[#42b883] hover:underline px-3 py-1.5 bg-[#42b883]/10 rounded-md w-full text-center hover:bg-[#42b883]/20 transition-colors"
                            >
                              Voir les détails
                            </button>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Légende -->
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{{ formatDate(server.history[0].date) }}</span>
                  <span>{{ formatDate(server.history[server.history.length - 1].date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue Incidents -->
    <div v-if="currentSection === 'incidents'" class="space-y-6">
      <!-- ... le contenu de la section incidents ... -->
    </div>

    <!-- Vue Maintenance -->
    <div v-if="currentSection === 'maintenance'" class="space-y-6">
      <!-- ... le contenu de la section maintenance ... -->
    </div>
  </main>
</template>

<style>
.group:hover .group-hover\:block {
  display: block !important;
  animation: fadeInOpacity 0.2s ease-in-out forwards;
}

@keyframes fadeInOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.group-hover\:block:hover {
  display: block !important;
}
</style> 