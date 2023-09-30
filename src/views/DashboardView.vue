<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue';
import router from '@/router';

const store = useAuthStore();
const token = store.token;
const role = store.role;
const user = store.user;
const name = store.name;
const userdata = ref('');
const lang = localStorage.getItem('lang') || 'en';

onMounted(async () => {
  // Fetches data for common dashboard with Post a request
  // Authorization is set to the JWT token and Language is set to user preference
  const response = await fetch('http://localhost:8080/user/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': lang,
    },
  });
  userdata.value = await response.text();
});

</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl mb-8">{{ $t('dashboard') }}</h1>
    <h2>{{ userdata }}</h2><br>
    <p class="font-semibold">{{ $t('username') }}: </p><p>{{ name }}</p><br>
    <p class="font-semibold">{{ $t('dashboard') }}: </p><p>{{ user }}</p><br>
    <p class="font-semibold">{{ $t('role') }}: </p><p>{{ role }}</p><br>
    <RouterLink to="/admin" class="text-indigo-400" v-if="role == 'MANAGER'">{{ $t('adminlink') }}</RouterLink>
  </div>
</template>
