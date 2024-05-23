<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppList from './AppList.vue'

const appListFolded = ref(true)
</script>

<template>
  <header>
    <h1>{{ $route.meta.title || 'Tianyi Network Apps' }}</h1>
    <span title="应用列表" @click="appListFolded = !appListFolded">
      <i class="bx bx-grid-small" />
    </span>
  </header>
  <client-only>
    <div class="apps-list-fold-container">
      <div class="apps-list-fold-content"
          :class="{
            'ui-faded-in': !appListFolded,
            'ui-faded-out': appListFolded,
          }">
        <div class="apps-list-fold-frame">
          <div class="apps-list-fold-closer">
            <span>应用列表</span>
            <span title="关闭" @click="appListFolded = true">
              <i class="apps-list-fold-close-icon bx bx-x" />
            </span>
          </div>
          <AppList layout="vertical" @link-click="appListFolded = true" />
        </div>
      </div>
    </div>
  </client-only>
  <nav class="ws-breadcrumb">
    <ul>
      <li><a href="/">Tianyi Network</a></li>
      <li><RouterLink to="/apps">Apps</RouterLink></li>
      <li class="ws-breadcrumb-current" v-if="$route.meta.type !== 'home'">
        <RouterLink v-if="$route.meta?.description" :to="$route.fullPath">{{ $route.meta.description }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
header span {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

header i {
  font-size: 3rem;
  color: var(--color-text);
  cursor: pointer;
  transition: color .3s;
}

header i {
  color: var(--color-deactivate);
}

header i:hover {
  color: var(--color-primary);
}

nav ul {
  display: block;
}

nav a {
  font-weight: 600;
}

@media screen and (max-width: 960px) {
  header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  header h1 {
    font-size: 1.25rem;
  }
}

@media screen and (max-width: 640px) {
  nav li.ws-breadcrumb-current {
    width: 100%;
  }
}

.apps-list-fold-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.apps-list-fold-content {
  position: absolute;
  overflow: hidden;
  width: 300px;
  height: auto;
  padding: 5px;
}

.apps-list-fold-folded {
  display: none;
}

.apps-list-fold-frame {
  width: 100%;
  padding: .8rem;
  background: var(--color-background);
  border: 1px solid var(--color-deactivate);
  border-radius: .8rem;
  box-shadow: 0 0 5px var(--color-deactivate);
  overflow: hidden;
  position: relative;
}

.apps-list-fold-closer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.apps-list-fold-closer span {
  display: block;
  padding: .5rem;
}

.apps-list-fold-close-icon {
  font-size: 1.5rem;
  padding: .25rem;
  color: var(--color-deactivate);
  cursor: pointer;
}

.apps-list-fold-close-icon:hover {
  color: var(--color-primary);
  background: var(--color-accent);
  border-radius: 50%;
}

@media screen and (max-width: 360px) {
  .apps-list-fold-content {
    width: 100%;
    left: 0;
    top: 0;
    padding: 0;
  }

  .apps-list-fold-frame {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--color-deactivate);
    box-shadow: 0 0 5px var(--color-deactivate);
  }
}
</style>
