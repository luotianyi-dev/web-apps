<script setup lang="ts">
import { Component } from 'vue';
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const route = useRoute()
const AppComponent: Component = route.meta.component as Component

useHead({
  title: `${route.meta.title} | ${WEBSITE_NAME}`,
  meta: [ { name: 'description', content: route.meta?.description as string } ],
})
</script>

<template>
  <AppComponent />
</template>
