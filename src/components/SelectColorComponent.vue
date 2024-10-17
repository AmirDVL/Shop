<template>
  <div class="select">
    <select v-model="selectedColor" @change="emitSelectedColor">
      <option value="">--انتخاب کنید--</option>
      <option v-for="color in colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch, onMounted } from "vue";

const props = defineProps({
  colors: {
    type: Array,
    required: true,
  },
  onColor: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:selectedColor"]);
const selectedColor = ref("");

const emitSelectedColor = () => {
  emit("update:selectedColor", selectedColor.value);
};

watch(
  () => props.onColor,
  (newColor) => {
    selectedColor.value = newColor;
  }
);
onMounted(() => {
  selectedColor.value = props.onColor || "";
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
