<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { routes } from '../main'
import { AppListProps } from '../props'

const props = defineProps<AppListProps>();
const apps = routes
  .filter(route => route.meta?.type === 'app')
  .map(route => ({
    name: route.meta?.title,
    icon: route.meta?.icon || 'hive',
    description: route.meta?.description || 'No description',
    path: route.path
  }))
</script>

<template>
  <div class="apps-list ws-grid-box">
    <RouterLink v-for="app in apps" class="app-link ws-button ws-grid-box-6"
      @click="$emit('linkClick')" :to="app.path" :key="app.path"
      :class="{ 'apps-list-vertical': props.layout === 'vertical', 'apps-list-horizontal': props.layout === 'horizontal' }">
      <i class="app-icon bx" :class="app.icon" />
      <div class="app-info">
        <span class="app-title">{{ app.name }}</span>
        <span class="app-description" v-if="props.layout === 'horizontal'">{{ app.description }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.app-link {
  padding: 1rem .5rem;
  display: flex;
  flex-direction: row;
}

.app-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: .5rem;
  text-transform: none;
}

.app-description {
  font-size: .8rem;
  color: var(--color-deactivate);
}

.app-icon {
  font-size: 48px;
  color: var(--color-deactivate);
}

.apps-list-vertical {
  flex-direction: column;
  align-items: center;
  border: none;
}

.apps-list-vertical .app-info {
  margin-left: 0;
}
</style>
