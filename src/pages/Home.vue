<script setup lang="ts">
import { useHead } from '@unhead/vue'
import AppList from '../components/AppList.vue'

useHead({
  title: WEBSITE_NAME
})
</script>

<template>
  <AppList layout="horizontal" />
</template>
