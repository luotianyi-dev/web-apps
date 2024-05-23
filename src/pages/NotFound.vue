<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: '404 Not Found'
})
</script>

<template>
  <div>
    <h1>找不到该应用</h1>
    <i class='bx bx-dizzy bx-tada' />
    <p>
      啥都木有<br />
      <code>URL: {{ $route.fullPath }}</code>
    </p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  height: 60vh;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  color: #c03030;
  margin-bottom: 60px;
}

i {
  color: var(--color-deactivate);
  font-size: 5rem;
}

code {
  color: var(--color-deactivate);
}
</style>
