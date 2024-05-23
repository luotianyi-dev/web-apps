<script setup lang="ts">
interface Props {
  section: any
  actionName: string
}

const props = defineProps<Props>()
</script>

<template>
  <section :class="props.section == 'loading' ? 'ui-faded-in' : 'ui-faded-out'">
    <p>
      <i class='bx bx-loader-alt bx-spin' />
      正在{{ actionName }}，请稍候……
    </p>
  </section>
</template>
