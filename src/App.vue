<script setup lang="js">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div dir="rtl">
    <nav>
      <RouterLink to="/">صفحه اصلی</RouterLink>
      <RouterLink to="/about">درباره ما</RouterLink>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<style>
nav {
  display: flex;
  gap: 1rem;
}
</style>
