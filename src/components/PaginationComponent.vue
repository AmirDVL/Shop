<template>
  <div class="pagination">
    <button @click="nextPage" :disabled="props.currentPage === props.totalPages">Next</button>
    <span>Page {{ props.currentPage }} of {{ props.totalPages }}</span>
    <button @click="prevPage" :disabled="props.currentPage === 1">Previous</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

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
    type: String, // Use String instead of URL for simplicity
    required: true,
  },
});

const emit = defineEmits(["updatePage"]);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("updatePage", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("updatePage", props.currentPage + 1);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #bf3a20;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #ec0000;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
