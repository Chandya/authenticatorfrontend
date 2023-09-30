<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue';

const store = useAuthStore();
const token = store.token;
const role = store.role;
const data = ref('');
const lang = localStorage.getItem('lang') || 'en';

onMounted(async () => {
  // Fetches data for admin dashboard with Post a request
  // Authorization is set to the JWT token and Language is set to user preference
  const response = await fetch('http://localhost:8080/admin/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': lang,
    },
  });
  data.value = await response.text();
});

</script>

<template>
    <h1 class="text-3xl mb-8" v-if="role=='MANAGER'">{{ $t('admindashboard') }}</h1>
    <h1 class="text-3xl mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative" v-else>{{ $t('noaccess') }}</h1>
    <p>{{ data }}</p>
    
</template>
