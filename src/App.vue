<template>
  <router-view></router-view>
</template>

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
  },
  // Ajoutez d'autres incidents ici
]

const maintenances = [
  {
    id: 'MNT-2024-001',
    status: 'planifiée', // 'planifiée', 'en-cours', 'terminée'
    title: 'Mise à jour majeure des serveurs',
    startDate: new Date('2024-03-25 03:00'),
    endDate: new Date('2024-03-25 05:00'),
    affectedServers: ['Game Panel', 'Game 01'],
    description: 'Mise à jour de sécurité et optimisations',
    updates: []
  }
  // Ajoutez d'autres maintenances ici
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
  },
]

// Modification de la génération de l'historique pour inclure plus de détails
const generateHistoryItem = (date) => {
  const random = Math.random()
  if (random > 0.9) { // Incident
    return {
      date,
      status: 'incident',
      incidentId: `INC-${date.getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
      title: 'Panne partielle du service',
      details: 'Temps de réponse dégradé'
    }
  } else if (random > 0.8) { // Maintenance
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

// Définir les refs pour contrôler l'état des modals
const isIncidentModalOpen = ref(false)
const isMaintenanceModalOpen = ref(false)

// Fonctions pour gérer l'ouverture/fermeture des modals
const openIncidentModal = () => {
  isIncidentModalOpen.value = true
}

const closeIncidentModal = () => {
  isIncidentModalOpen.value = false
}

const openMaintenanceModal = () => {
  isMaintenanceModalOpen.value = true
}

const closeMaintenanceModal = () => {
  isMaintenanceModalOpen.value = false
}
</script>

<style>
/* Supprimez tout le contenu du style scoped précédent */

/* Modification des styles d'animation */
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

/* Style pour garder le tooltip visible pendant le hover */
.group-hover\:block:hover {
  display: block !important;
}
</style>
