<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import MessageBox from '../MessageBox.vue'
import { handleApiError } from '../../api-errors'
import { MessageBoxProps } from '../../props'

const message = ref<MessageBoxProps>({ text: '', type: 'primary', hidden: true })
const loading = ref(false)
const line1 = ref('')
const line2 = ref('')
const imageWebpUrl = ref('javascript:void(0)')
const imageJpegUrl = ref('javascript:void(0)')
const showResult = ref(false)

async function generate(): Promise<void> {
  loading.value = true
  axios.get('/apps/api/paperboard', {
    responseType: 'blob',
    params: {
      line1: line1.value || null,
      line2: line2.value || null,
      format: 'webp',
    }
  }).then(response => {
    const requestUrl = new URL(response.request.responseURL)
    requestUrl.searchParams.set('format', 'jpeg')
    imageWebpUrl.value = URL.createObjectURL(response.data)
    imageJpegUrl.value = requestUrl.toString()
    loading.value = false
    showResult.value = true
  }).catch(async (error) => {
    loading.value = false
    message.value = { text: await handleApiError(error), type: 'error', hidden: false }
  })
}
</script>

<template>
  <article>
    <section>
      <MessageBox :text="message.text" :type="message.type" :hidden="message.hidden" />
      <div class="paperboard-input-group">
        <div class="ws-form-group">
          <label for="input-text-line1">第一行</label>
          <input id="input-text-line1" type="text" class="input" placeholder="好" v-model="line1" />
        </div>
        <div class="ws-form-group">
          <label for="input-text-line2">第二行</label>
          <input id="input-text-line2" type="text" class="input" placeholder="吃" v-model="line2" />
        </div>
      </div>
      <div class="paperboard-button-group">
        <button class="ws-button" id="button-submit" @click="generate">生成</button>
      </div>
      <i class="bx bx-loader-alt bx-spin" v-if="loading" />
      <div class="paperboard-result" :class="{ 'ui-faded-out': !showResult, 'ui-faded-in': showResult }">
        <img :src="imageWebpUrl" id="card" alt="未加载成功的表情包" />
        <a :href="imageWebpUrl" target="_blank" id="button-download">下载 (WebP 压缩)</a>
        <a :href="imageJpegUrl" target="_blank" id="button-download">下载原图 (JPEG)</a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.ws-form-group, input {
  width: 100%;
}

.paperboard-input-group {
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.paperboard-button-group {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.paperboard-result {
  margin-top: 3rem;
}

.paperboard-result img {
  margin-bottom: .5rem;
  display: block;
  width: 100%;
  max-width: 300px;
}

.paperboard-result a {
  display: inline-block;
  margin-right: 1rem;
}

@media screen and (max-width: 640px) {
  .paperboard-result img {
    margin-bottom: 1rem;
  }

  .paperboard-result a {
    display: block;
    margin-top: .5rem;
    margin-right: 0;
  }
}
</style>
