<script setup lang="ts">
import Header from "./components/Header.vue"
</script>

<template>
  <v-app>
    <div class="min-h-screen bg-gray-100">
      <Header />
      <main class="p-8">
        <RouterView />
      </main>
    </div>
  </v-app>
</template>
