<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { handleApiError } from '../../../api-errors';
import { MessageBoxProps } from '../../../props';
import MessageBox from '../../../components/MessageBox.vue'
import CardLoadingPartial from './partials/CardLoadingPartial.vue'
import CardResultPartial from './partials/CardResultPartial.vue'

type Section = 'apply' | 'result' | 'loading'
interface CardModel {
  surname: string
  givenName: string
  romanizedSurname: string
  romanizedGivenName: string
  sex: string
  dateOfBirth: string
  cardNo: string
  key: string
}

const message = ref<MessageBoxProps>({ text: '', type: 'primary', hidden: true })
const section = ref<Section>('apply')
const model = ref<CardModel>({
  surname: '', givenName: '', romanizedSurname: '', romanizedGivenName: '',
  sex: '', dateOfBirth: '', cardNo: '', key: ''
})

function sectionClass(sectionName: Section): Record<string, boolean> {
  return {
    'ui-faded-out': section.value !== sectionName,
    'ui-faded-in': section.value === sectionName,
  }
}

function formatSex(): string {
  const sex = model.value.sex.toUpperCase().trim()
  if (sex == '') return ''
  if (sex.startsWith('M') || sex.endsWith('M')) return 'M'
  if (sex.startsWith('F') || sex.endsWith('F')) return 'F'
  return 'X'
}

async function apply() {
  section.value = 'loading'
  message.value.hidden = true
  const {
    surname, givenName, romanizedSurname, romanizedGivenName,
    sex, dateOfBirth
  } = model.value

  await axios.post('/apps/api/card', {
    surname, givenName, romanizedSurname, romanizedGivenName,
    sex, dateOfBirth
  }).then(response => {
    const { cardNo, key } = response.data
    model.value = { ...model.value, cardNo, key }
    section.value = 'result'
  }).catch(async error => {
    section.value = 'apply'
    message.value = { text: await handleApiError(error), type: 'error', hidden: false }
  })
}
</script>

<template>
  <section>
    <h2>申请「天依卡」</h2>
    <MessageBox :text="message.text" :type="message.type" :hidden="message.hidden" />
    <section :class="sectionClass('apply')" class="card-apply-section-apply">
      <div class="ws-form-group">
        <label for="surname">姓 (Surname)</label>
        <input type="text" id="surname" placeholder="洛" v-model="model.surname" />
      </div>
      <div class="ws-form-group">
        <label for="given-name">名 (Given Name)</label>
        <input type="text" id="given-name" placeholder="天依" v-model="model.givenName" />
      </div>
      <div class="ws-form-group">
        <label for="romanized-surname">姓拼音 (Romanized Surname)
          <small>仅限大写英文字母</small>
        </label>
        <input type="text" id="romanized-surname" placeholder="LUO" v-model="model.romanizedSurname"
          @blur="model.romanizedSurname = model.romanizedSurname.toUpperCase()" />
      </div>
      <div class="ws-form-group">
        <label for="romanized-given-name">名拼音 (Romanized Given Name)
          <small>仅限大写英文字母</small>
        </label>
        <input type="text" id="romanized-givenName" placeholder="TIANYI" v-model="model.romanizedGivenName"
          @blur="model.romanizedGivenName = model.romanizedGivenName.toUpperCase()" />
      </div>
      <div class="ws-form-group">
        <label for="sex">性别 (Sex)
          <small>仅限单个大写英文字母: 男 M / 女 F / 其他或未知 X</small>
        </label>
        <input type="text" id="sex" placeholder="F" v-model="model.sex" @blur="model.sex = formatSex()" />
      </div>
      <div class="ws-form-group">
        <label for="date-of-birth">出生日期 (Date of Birth)
          <small>日期格式: YYYY-MM-DD</small>
        </label>
        <input type="text" id="date-of-birth" placeholder="2012-07-12" v-model="model.dateOfBirth" />
      </div>
      <button class="ws-button" @click="$emit('updatePage', 'home')">返回</button>
      <button class="ws-button" @click="apply">提交申请</button>
    </section>
    <CardLoadingPartial :section="section" action-name="提交申请" />
    <CardResultPartial  :section="section" message="您的「天依卡」申请成功。"
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

.card-apply-section-apply input {
  width: 100%;
}

.card-apply-section-apply small {
  display: block;
}
</style>
