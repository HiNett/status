<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <!-- Header simplifié -->
    <header class="pt-12 pb-6 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl font-extrabold text-white tracking-tight">
          Status <span class="text-[#42b883]">FPHT</span>
        </h1>
        <p class="mt-3 text-gray-400 text-lg">Surveillance en temps réel de nos services</p>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="border-b border-gray-700">
        <div class="-mb-px flex space-x-8">
          <router-link
            v-for="section in ['status', 'incidents', 'maintenance']"
            :key="section"
            :to="section === 'status' ? '/' : `/${section}`"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium transition-colors"
            :class="[
              $route.path === (section === 'status' ? '/' : `/${section}`)
                ? 'border-[#42b883] text-[#42b883]'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            ]"
          >
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Contenu de la page -->
    <router-view></router-view>
  </div>
</template> 