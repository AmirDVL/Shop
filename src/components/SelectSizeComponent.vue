<template>
  <div class="select">
    <select :value="onSize" @change="emitSelectedSize">
      <option value="">--انتخاب کنید--</option>
      <option v-for="size in sizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  sizes: {
    type: Array,
    required: true,
  },
  onSize: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:selectedSize"]);

const emitSelectedSize = (event) => {
  emit("update:selectedSize", event.target.value);
};
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
