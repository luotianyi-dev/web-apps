<script setup lang="ts">
interface Props {
  png: string
  webp: string
}

defineProps<Props>()
</script>

<template>
  <div class="ws-form-group">
    <span>您的「天依卡」：</span>
    <img id="card" alt="未加载成功「天依卡」图像" :src="webp" />
    <a :href="png" target="_blank" class="ws-button">下载 (原图)</a>
    <a :href="webp" target="_blank" class="ws-button">下载 (WebP 压缩)</a>
  </div>
</template>

<style scoped>
div > span {
  margin-top: 3rem;
}

img {
    display: block;
    margin: 0;
    margin: .5rem 0;
    width: 100%;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}
</style>
