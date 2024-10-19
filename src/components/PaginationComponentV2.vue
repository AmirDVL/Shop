<template>
  <div class="q-pa-lg flex flex-center">
    <slot></slot>
    <q-pagination
      v-model="internalPage"
      color="purple"
      :max="totalPages"
      :min="1"
      :max-pages="6"
      boundary-numbers
      ellipses
      size="1.5rem"
      :round="true"
      class="mw-100"
    />
    <slot name="footer" v-bind="{ totalPages }"></slot>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { QPagination } from "quasar";

// Define props
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Internal reactive state for the current page
const internalPage = ref(props.modelValue);

// Watch for changes in the internalPage and emit the update event
watch(internalPage, (newPage) => {
  emit("update:modelValue", newPage);
});

// Watch for changes in the modelValue prop and update the internalPage
watch(
  () => props.modelValue,
  (newPage) => {
    internalPage.value = newPage;
  }
);
</script>

<style scoped>
.q-pa-lg {
  padding: 16px;
}
.flex {
  display: flex;
}
.flex-center {
  justify-content: center;
  align-items: center;
}
</style>
