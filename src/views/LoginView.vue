<script lang="ts" setup>
import LoginForm from '../components/LoginForm.vue'

</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl mb-8">{{ $t('login') }}</h1>
    <login-form />
  </div>
</template>
