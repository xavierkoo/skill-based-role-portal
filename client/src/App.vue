<script setup>
import NavBar from './components/NavBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const showNavbar = computed(() => {
  return route.name !== 'login' && localStorage.getItem('id') !== null
})
</script>

<template>
  <header>
    <NavBar v-if="showNavbar" class="mb-3" />
  </header>
  <RouterView />
</template>

<style scoped></style>
