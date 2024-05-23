<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { MessageBoxProps } from '../../../props';
import MessageBox from '../../MessageBox.vue';
import CardImagePartial from './partials/CardImagePartial.vue';
import { handleApiError } from '../../../api-errors';
import CardLoadingPartial from './partials/CardLoadingPartial.vue';

type Section = 'lookup' | 'loading' | 'result'

const message = ref<MessageBoxProps>({ text: '', type: 'primary', hidden: true })
const section = ref<Section>('lookup')
const cardKey = ref('')
const png = ref('')
const webp = ref('')

async function handleLookupError(error: any): Promise<void> {
  if (error.response && error.response.status == 404) {
    message.value = { text: '「天依卡」未找到。', type: 'error', hidden: false }
  } else {
    message.value = { text: await handleApiError(error), type: 'error', hidden: false }
  }
}

async function lookup(): Promise<void> {
  if (cardKey.value == '') {
    message.value = { text: '请输入「天依卡签名密钥」。', type: 'error', hidden: false }
    return
  }
  if (cardKey.value.length != 40) {
    message.value = { text: '「天依卡签名密钥」长度错误。', type: 'error', hidden: false }
    return
  }

  section.value = 'loading'
  const [webpResponse, pngResponse] = await Promise.all([
    axios
      .get(`/apps/api/card/${cardKey.value}.webp`, { responseType: 'blob' })
      .catch(async (error) => await handleLookupError(error)),
    axios
      .get(`/apps/api/card/${cardKey.value}.png`, { responseType: 'blob' })
      .catch(async (error) => await handleLookupError(error))
  ])

  if (!webpResponse || !pngResponse) {
    section.value = 'lookup'
    return
  }

  webp.value = URL.createObjectURL(webpResponse.data)
  png.value = URL.createObjectURL(pngResponse.data)
  message.value.hidden = true
  section.value = 'result'
}
</script>

<template>
  <section>
    <h2>下载「天依卡」</h2>
    <MessageBox :text="message.text" :type="message.type" :hidden="message.hidden" />
    <p>
      如果您已经有了「天依卡」，您可以通过您的「天依卡签名密钥」重新下载您的「天依卡」。
    </p>
    <div class="ws-form-group">
      <label for="card-key">请输入您的「天依卡签名密钥」 ：</label>
      <input type="text" id="card-key" placeholder="da39a3ee5e6b4b0d3255bfef95601890afd80709" v-model="cardKey" />
      <button class="ws-button" @click="$emit('updatePage', 'home')">返回</button>
      <button class="ws-button" @click="lookup">查找</button>
    </div>
    <CardLoadingPartial :section="section" action-name="查找" />
    <div v-if="section == 'result'">
      <CardImagePartial :png="png" :webp="webp" />
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin: 0;
  margin-bottom: 1rem;
}

input {
  width: 100%;
}

.ws-form-group button {
  margin-left: 0;
  margin-right: .5rem;
}
</style>
