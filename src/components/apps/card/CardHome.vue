<script setup lang="ts">
import announcement from '../../../resources/card/announcement.html?raw'
</script>

<template>
  <section>
    <div class="card-announcement" v-html="announcement" />
    <div class="card-operations">
      请选择您要进行的操作：
      <p>
        <span class="ws-small">在开始申请「天依卡」前，请确保您已阅读并同意上文的「重要提示」和「编码规范」。</span><br />
        <button @click="$emit('updatePage', 'apply')">申请「天依卡」</button>
      </p>
      <p>
        <span class="ws-small">下载「天依卡」需要您的「签名密钥」。「天依卡签名密钥」是一个 40 位字母 A-F 和数字组成的号码，在您申请「天依卡」时已提供给您。</span><br>
        <button @click="$emit('updatePage', 'download')">下载「天依卡」</button>
      </p>
      <p>
        <span class="ws-small">若您不记得您的「天依卡签名密钥」，您可以通过申请时填写的姓名、出生日期和卡号找回您的「天依卡」。</span><br>
        <button @click="$emit('updatePage', 'query')">找回「天依卡」</button>
      </p>
    </div>
  </section>
</template>

<style scoped>
h3 {
  margin: 0;
  margin-top: 1em;
}

.card-operations {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.card-operations p {
  margin: 0;
  margin-top: 2rem;
}

.card-operations > p > span {
  margin-left: .5rem;
}
</style>
