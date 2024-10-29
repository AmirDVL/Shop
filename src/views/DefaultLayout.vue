<template>
  <div>
    <HeadComponent />
    <MainMenu />
    <router-view />
  </div>
</template>

<script setup>
import HeadComponent from "@/components/HeadComponent.vue";
import MainMenu from "@/components/MainMenu.vue";
</script>
