<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { handleApiError } from '../../../api-errors';
import { MessageBoxProps } from '../../../props';
import MessageBox from '../../../components/MessageBox.vue'
import CardLoadingPartial from './partials/CardLoadingPartial.vue'
import CardResultPartial from './partials/CardResultPartial.vue';

type Section = 'query' | 'loading' | 'result'
interface CardModel {
  cardNo: string
  surname: string
  givenName: string
  dateOfBirth: string
  key: string
}

const message = ref<MessageBoxProps>({ text: '', type: 'primary', hidden: true })
const section = ref<Section>('query')
const model = ref<CardModel>({ cardNo: '', surname: '', givenName: '', dateOfBirth: '', key: '' })

function formatCardNo(cardNo: string): string {
  cardNo = cardNo.trim().toUpperCase()
  if (cardNo == '') return ''
  cardNo = cardNo.replace(/[^A-Z0-9]/g, '')
  if (!cardNo.startsWith('LA')) cardNo = 'LA' + cardNo
  if (cardNo.length > 9) cardNo = cardNo.slice(0, 9)
  return cardNo
}

async function query(): Promise<void> {
  section.value = 'loading'
  message.value.hidden = true
  const { cardNo, surname, givenName, dateOfBirth } = model.value

  axios.get('/apps/api/card', {
    params: { cardNo, surname, givenName, dateOfBirth }
  })
    .then(response => {
      model.value.key = response.data.key
      section.value = 'result'
    })
    .catch(async error => {
      section.value = 'query'
      message.value = { text: await handleApiError(error), type: 'error', hidden: false }
    })
}

function sectionClass(sectionName: Section): Record<string, boolean> {
  return {
    'ui-faded-out': section.value !== sectionName,
    'ui-faded-in': section.value === sectionName,
  }
}
</script>

<template>
  <section>
    <h2>找回「天依卡」</h2>
    <MessageBox :text="message.text" :type="message.type" :hidden="message.hidden" />
    <section :class="sectionClass('query')" class="card-query-section-query">
      <div class="ws-form-group">
        <!-- cardNo -> icao9303-id to avoid credit card autocomplete -->
        <label for="icao9303-id">卡号</label>
        <input type="text" id="icao9303-id" placeholder="LA1278888" v-model="model.cardNo"
          @blur="model.cardNo = formatCardNo(model.cardNo)" />
      </div>
      <div class="ws-form-group">
        <label for="surname">姓 (Surname)</label>
        <input type="text" id="surname" placeholder="洛" v-model="model.surname" />
      </div>
      <div class="ws-form-group">
        <label for="given-name">名 (Given Name)</label>
        <input type="text" id="given-name" placeholder="天依" v-model="model.givenName" />
      </div>
      <div class="ws-form-group">
        <label for="date-of-birth">出生日期 (Date of Birth)
          <small>日期格式: YYYY-MM-DD</small>
        </label>
        <input type="text" id="date-of-birth" placeholder="2012-07-12" v-model="model.dateOfBirth" />
      </div>
      <button class="ws-button" @click="$emit('updatePage', 'home')">返回</button>
      <button class="ws-button" @click="query">查询</button>
    </section>
    <CardLoadingPartial :section="section" action-name="查询" />
    <CardResultPartial  :section="section" message="找到了您的「天依卡」。"
      :cardId="model.cardNo" :cardKey="model.key"
      @message="message = $event"
      @update-page="$emit('updatePage', $event)" />
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
</style>
