<script setup lang="ts">
const email = 'lty@luotianyi.dev'
</script>

<template>
  <footer>
    <p>
      © 2024 <a href="https://luotianyi.dev/">Tianyi Network</a>
      <br />
      <client-only>
        Email: <a :href="`mailto:${email}`">{{ email }}</a>
        <br />
      </client-only>
      <RouterLink to="/apps/license">二次创作与开放源代码许可</RouterLink>
      <br />
      <a href="/terms-of-service">服务条款</a>
      |
      <a href="/privacy-policy">隐私政策</a>
      |
      <a target="_blank" href="https://login.microsoftonline.com/?whr=luotianyi.dev">工作账户</a>
      <br />
      <a href="/contact">联系方式</a>
      |
      <a href="/join-us">加入我们</a>
      |
      <a href="/partnership">开展合作</a>
      |
      <a href="/about">关于</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  text-align: right;
}

@media screen and (max-width: 460px) {
  footer {
    line-height: 2;
  }

  .footer-email {
    display: none;
  }
}
</style>
