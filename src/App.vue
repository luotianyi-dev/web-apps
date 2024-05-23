<script setup lang="ts">
import './styles/fade.css'
import 'boxicons/css/boxicons.min.css'
import '@luotianyi-dev/whitestone-stream-ui/src/whitestone-stream-ui.css'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <main>
    <Header />
    <div>
      <RouterView :key="$route.fullPath" />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
main > div {
  min-height: 50vh;
}
</style>
