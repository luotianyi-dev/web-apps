<script setup lang="ts">
import { MessageBoxProps } from '../props'

const props = defineProps<MessageBoxProps>()
</script>

<template>
  <div class="ws-alert"
    :class="[
      `ws-alert-${props.type}`,
      hidden ? 'ui-faded-out' : 'ui-faded-in'
    ]"
    v-html="text" />
</template>
