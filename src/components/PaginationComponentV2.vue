<script setup>
import { ref, watch } from "vue";
import { QPagination } from "quasar";

// Define props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["updatePage"]);

// Reactive currentPage
const currentPage = ref(props.currentPage);

// Watch for changes in currentPage
watch(currentPage, (newPage) => {
  emit("updatePage", newPage);
});

// Method to update the page
const updatePage = (newPage) => {
  currentPage.value = newPage;
};
</script>

<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      model-value="currentPage"
      color="purple"
      :max="totalPages"
      :min="1"
      :max-pages="6"
      boundary-numbers
      @update:model-value="updatePage"
      ellipses="true"
      direction-links="true"
    />
  </div>
</template>

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
