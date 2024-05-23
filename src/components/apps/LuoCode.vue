<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import MessageBox from '../MessageBox.vue'
import { MessageBoxProps } from '../../props'
import { handleApiError } from '../../api-errors'
import codebookMapping from '../../resources/luocode/codebook.json'
import instruction from '../../resources/luocode/instruction.html?raw'

interface Codebook {
  [key: string]: string
}

interface BlockedWordGroups {
  wordLength: number
  sha1Hashes: string[]
}

const CHIPER_HEADER = "天依想吃：";
const codebook = codebookMapping as Codebook
const blockedWords = ref<BlockedWordGroups[]>([])
const message = ref<MessageBoxProps>({ text: '', type: 'primary', hidden: true })
const plain = ref('')
const cipher = ref('')
const plainOpacity = ref(10)
const cipherOpacity = ref(10)

onMounted(async () => {
  if (location.hash.startsWith('#!')) {
    cipher.value = decodeURIComponent(location.hash.substring(2))
  }
  axios
    .get('/apps/api/blocked-word')
    .then(response => {
      if (!response.data) return console.error('无法获取敏感词列表：数据解析错误', response)
      blockedWords.value = response.data
    })
    .catch(error => {
      message.value = { text: `无法获取敏感词列表：${handleApiError(error)}`, type: 'error', hidden: false }
    })
})

async function encode(): Promise<void> {
  const censorResult = await censor(plain.value, blockedWords.value)
  if (censorResult === 'censored') {
    message.value = {
      type: 'error', hidden: false, text: `
      您输入的内容包含敏感词。您的加密已终止。请不要用此工具加密违反相关法律法规的敏感信息。
      我们不会将您的加密内容发送到服务器，敏感词检查是从服务器下载敏感词库后在本地运行的。
      我们也不会对试图加密敏感词的用户身份进行任何记录或追踪。
      `.trim().replace(/\n\s+/g, '<br />')
    }
    return
  }
  const bytes = new TextEncoder().encode(plain.value)
  const base64 = btoa(String.fromCharCode(...bytes))
  const chiperBody = base64.split('').map(x => codebook[x]).join('')
  message.value.hidden = true
  opacityAnimate(cipherOpacity, 0, 10)
  cipher.value = CHIPER_HEADER + chiperBody
  history.replaceState(null, '', `#!${encodeURIComponent(cipher.value)}`)
}

function decode(): void {
  const cipherText = cipher.value
  if (cipherText.trim() === '') return
  if (!cipherText.startsWith(CHIPER_HEADER)) {
    message.value = {
      text: '天依没有想吃的东西，吃饱了！（您的密文没有以「天依想吃：」开头，请检查输入）。',
      type: 'error', hidden: false,
    }
    return
  }
  const chiperBody = cipherText.substring(CHIPER_HEADER.length)
  const base64 = chiperBody.split('')
    .map((_, i) => {
      if (i % 2 == 1) return ''
      const chiperUnit = chiperBody[i] + chiperBody[i + 1]
      const key = Object
        .entries(codebook)
        .find(([_, value]) => value === chiperUnit)
      if (!key) {
        message.value = {
          text: `天依不知道「${chiperUnit}」是什么东西，吃不了！（您的密文有密码本中不存在的密文单元，请检查输入。）`,
          type: 'error', hidden: false,
        }
      }
      return key ? key[0] : ''
    })
    .join('')
  const bytes = atob(base64).split('').map(x => x.charCodeAt(0))
  const result = new TextDecoder('utf-8').decode(new Uint8Array(bytes))
  message.value.hidden = true
  opacityAnimate(plainOpacity, 0, 10)
  plain.value = result.trim()
}

function exchange(): void {
  const { plainText, cipherText } = { plainText: plain.value, cipherText: cipher.value }
  opacityAnimate(plainOpacity, 0, 10)
  opacityAnimate(cipherOpacity, 0, 10)
  plain.value = cipherText
  cipher.value = plainText
}

async function censor(text: string, lookup: BlockedWordGroups[]) : Promise<'pass' | 'censored'> {
  try {
    const plainText = text.replace(/\s/g, '').toUpperCase()
    for (let i = 0; i < lookup.length; i++) {
      for (let j = 0; j < plainText.length; j++) {
        const testingText = plainText.substring(j, j + lookup[i].wordLength)
        const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(testingText))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashDigest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        for (let k = 0; k < lookup[i].sha1Hashes.length; k++) {
          if (hashDigest === lookup[i].sha1Hashes[k]) {
            console.log('检测到敏感词汇：', {
              testingText,
              hashDigest,
              plainText,
              matchingLength: lookup[i].wordLength,
              matchingHashSet: lookup[i].sha1Hashes,
              internalCounter: {
                'i (groupIndex)': i,
                'j (positionOfPlainText)': j,
                'k (hashIndexOfHashSet)': k,
              }
            })
            return "censored"
          }
        }
      }
    }
    return "pass"
  } catch (e) {
    console.error("检测敏感词时出现错误：", e);
    return "pass";
  };
}

function opacityAnimate(target: { value: number }, startOpacity: number, endOpacity: number) {
  target.value = startOpacity
  if (startOpacity >= endOpacity) return
  setTimeout(() => {
    opacityAnimate(target, startOpacity + 1, endOpacity)
  }, 20)
}
</script>

<template>
  <article>
    <section>
      <MessageBox :text="message.text" :type="message.type" :hidden="message.hidden" />
      <div class="ws-form-group">
        <label for="plain-text">明文</label>
        <textarea class="ws-form-fullwidth" id="plain-text" placeholder="请输入明文"
          :style="{ color: `rgba(12, 12, 12, ${plainOpacity / 10})` }"
          v-model="plain" />
      </div>
      <div class="luocode-buttons-group">
        <button class="ws-button" @click="encode">↓ 加密</button>
        <button class="ws-button" @click="exchange">↑ 交换明密文 ↓</button>
        <button class="ws-button" @click="decode">解密 ↑</button>
      </div>
      <div class="ws-form-group">
        <label for="chiper-text">密文</label>
        <textarea class="ws-form-fullwidth" id="chiper-text" placeholder="请输入密文"
          :style="{ color: `rgba(12, 12, 12, ${cipherOpacity / 10})` }"
          v-model="cipher" />
      </div>
      <div class="ws-small">
        <p>
          <b>注意事项：</b>
          <div v-html="instruction" />
        </p>
      </div>
    </section>
  </article>
</template>

<style scoped>
textarea {
  min-height: 10rem;
  width: 100%;
  resize: vertical;
  font-family: var(--font-family-normal);
}

.luocode-buttons-group {
  margin: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0 1rem;
}

@media screen and (max-width: 860px) {
  .luocode-buttons-group {
    grid-template-columns: 1fr;
  }
}
</style>
