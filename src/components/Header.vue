<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { reactive, ref } from "vue";

const auth = useAuthStore();

const prop = reactive({
  lang: localStorage.getItem("lang") || "en",
});

function handleChange(event: any) {
  // If language is set, store it in local storage 
  localStorage.setItem("lang", event.target.value);
  window.location.reload();
}

function logout() {
  auth.logout();
}
</script>

<template>
  <header class="p-8">
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <RouterLink to="/" class="flex items-center">
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ $t('home') }}</span>
            </RouterLink>
            <div class="flex items-center">
                <div class="mr-6 text-sm  text-gray-500 dark:text-white hover:underline cursor:pointer">
                  <select
                    v-model="prop.lang"
                    @change="handleChange($event)"
                    class="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <a href="#" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline" @click="logout" v-if="auth.user">{{ $t('logout') }}</a>
                </div>
            </div>
        </div>
    </nav>
  </header>
</template>
