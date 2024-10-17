<template>
  <div class="select">
    <select v-model="selectedSize" @change="emitSelectedSize">
      <option value="">--انتخاب کنید--</option>
      <option v-for="size in sizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { defineProps, ref, defineEmits, watch, onMounted } from "vue";

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
const selectedSize = ref("");

const emitSelectedSize = () => {
  emit("update:selectedSize", selectedSize.value);
};

watch(
  () => props.onSize,
  (newSize) => {
    selectedSize.value = newSize;
  }
);
onMounted(() => {
  selectedSize.value = props.onSize || "";
});
</script>
<style lang="css" scoped>
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
