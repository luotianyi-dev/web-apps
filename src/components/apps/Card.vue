<script setup lang="ts">
import { ref } from 'vue'
import CardHome from './card/CardHome.vue'
import CardApply from './card/CardApply.vue'
import CardQuery from './card/CardQuery.vue'
import CardDownload from './card/CardDownload.vue'

export type CardPage = 'home' | 'apply' | 'query' | 'download'

const page = ref<CardPage>('home')

function pageClass(pageName: CardPage): Record<string, boolean> {
  return {
    'ui-faded-out': page.value !== pageName,
    'ui-faded-in': page.value === pageName,
  }
}
</script>

<template>
  <article>
    <CardHome     :class="pageClass('home')"     @update-page="page = $event" />
    <CardApply    :class="pageClass('apply')"    @update-page="page = $event" />
    <CardDownload :class="pageClass('download')" @update-page="page = $event" />
    <CardQuery    :class="pageClass('query')"    @update-page="page = $event" />
  </article>
</template>

<style scoped>
</style>
