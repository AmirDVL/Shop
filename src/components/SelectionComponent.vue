<template>
  <div class="select">
    <select v-model="modelValue">
      <option value="">--انتخاب کنید--</option>
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue",
});
</script>

<style scoped>
.select {
  margin-top: 1rem;
}
select {
  width: 100%;
  border: 1px solid #000;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
