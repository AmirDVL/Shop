<template>
  <div dir="ltr">
    <q-select v-model="model" :options="[9, 8]" label="hdasdiasjdiojasiodjsioaj" class="q-mx-xl" />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  colors: {
    type: Array,
    required: true,
  },
});
const model = ref(9);
</script>

<style></style>
