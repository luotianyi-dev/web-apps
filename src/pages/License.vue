<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'

const licenses: { name: string, licenseText: string }[] = DEPENDENCY_LICENSE;
const licenseSelectorHidden = ref(true)
const currentLicense = ref(licenses[0].name)

function updateCurrentLicense(licenseName: string): void {
  currentLicense.value = licenseName
  licenseSelectorHidden.value = true
  window.scrollTo(0, 0)
}

useHead({
  title: `二次创作与开放源代码许可 | ${WEBSITE_NAME}`
})
</script>

<template>
  <div class="license-selector" :class="{ 'license-selector-hidden': licenseSelectorHidden }">
    <h2>许可证列表</h2>
    <ul>
      <li v-for="license in licenses" :key="license.name"
        :class="{ 'license-selected': license.name === currentLicense }"
        @click="updateCurrentLicense(license.name)">
          {{ license.name }}
      </li>
    </ul>
  </div>
  <div class="license-selector-switch">
    <span title="许可证列表" @click="licenseSelectorHidden = !licenseSelectorHidden">
      <i class='bx bx-menu' />
    </span>
  </div>
  <div class="license-text-container">
    <section class="license-text"
      v-for="license in licenses"
      v-show="currentLicense === license.name"
      :key="license.name"
      :data-license-name="license.name">
        <h2 class="license-title">{{ license.name }}</h2>
        <pre class="license-content">{{ license.licenseText }}</pre>
    </section>
  </div>

</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: .8rem;
}

.license-selector {
  background: var(--color-accent);
  height: 100vh;
  width: 320px;
  left: 0;
  top: 0;
  position: fixed;
}

.license-selector h2 {
  margin-left: 1rem;
  margin-top: 3.25rem;
}

.license-selector ul {
  list-style: none;
  padding: 0;
}

.license-selector li {
  display: flex;
  color: var(--color-primary);
  padding: .5rem 1rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.license-selector li:hover {
  background: var(--color-highlight);
}

.license-selector-switch {
  display: none;
}

.license-selector li.license-selected {
  background: var(--color-background);
  color: var(--color-text);
}

@media screen and (max-width: 1610px) {
  .license-selector {
    width: 100%;
  }

  .license-selector-hidden {
    display: none;
  }

  .license-selector-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background: var(--color-accent);
    width: 2.5rem;
    height: 2.5rem;
  }

  .license-selector-switch span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: .5rem;
    color: var(--color-primary);
  }

  .license-selector-switch span:hover {
    color: var(--color-accent);
    background: var(--color-highlight);
  }

  .license-selector-switch i {
    font-size: 1.2rem;
  }

  .license-selector li.license-selected {
    background: var(--color-accent);
    color: var(--color-primary);
  }
}
</style>
