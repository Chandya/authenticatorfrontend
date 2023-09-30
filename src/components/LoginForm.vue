<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const user = reactive({
  username: '',
  password: '',
  error: ''
});

async function onSubmit() {
  // If username and password fields are filled
  if (user.username != '' && user.password != '') {
    try {
      await useAuthStore().login(user.username, user.password);
    } catch (e: any) {
      // If login fails from the server
      user.error = e.message;
    }
  } else {
    // If username and password fields are empty
    user.error = 'Field(s) are empty';
  }
}
</script>

<template>
  <form class="bg-white p-8 rounded-md shadow-md" @submit.prevent="onSubmit">
    <p v-if="user.error!=''" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative" role="alert">{{ user.error }}</p><br>
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('username') }}</label>
      <input type="text" id="username" placeholder="Username" v-model="user.username"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="mb-6">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('password') }}</label>
      <input type="password" id="password" placeholder="Password" v-model="user.password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="flex items">
      <button
        class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">
        {{ $t('signin') }}
      </button>
    </div>
  </form>
</template>