<script setup lang="ts">
import { computed } from 'vue';
import CardImagePartial from './CardImagePartial.vue';

interface Props {
  section: any
  message: string
  cardId: string
  cardKey: string
}

const props = defineProps<Props>()
const emit = defineEmits(['message', 'updatePage'])
const png = computed(() => getDownloadUrl(props.cardKey, 'png'))
const webp = computed(() => getDownloadUrl(props.cardKey, 'webp'))

function getDownloadUrl(key: string, format: 'png' | 'webp' = 'png'): string {
  if (key == '') return 'javascript:void(0)'
  return `/apps/api/card/${key}.${format}`
}

async function copyText(text: string, itemName: string, additionalMessage: string = ''): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    emit('message', { text: `已复制${itemName}。${additionalMessage}`, type: 'success', hidden: false })
  } catch (error) {
    emit('message', { text: `由于浏览器限制，无法${itemName}。请手动复制。`, type: 'error', hidden: false })
  }
}
</script>

<template>
  <section :class="props.section == 'result' ? 'ui-faded-in' : 'ui-faded-out'">
    <p>
      {{ message }}
      <br />
      请妥善保管您的「天依卡签名密钥」。任何知道「天依卡签名密钥」的人都可以下载并您的「天依卡」。
    </p>
    <div class="ws-form-group">
      <label for="card-id">卡号</label>
      <input id="card-id" type="text" disabled="true" v-model="props.cardId">
      <button class="ws-button" @click="$emit('updatePage', 'home')">返回</button>
      <button class="ws-button" @click="copyText(props.cardId, '卡号')">复制卡号</button>
    </div>
    <CardImagePartial :png="png" :webp="webp" />
  </section>
</template>

<style scoped>
input[disabled] {
  background: var(--color-accent) !important;
  color: var(--color-text) !important;
  width: 100%;
}

button {
  margin-left: 0;
}
</style>
