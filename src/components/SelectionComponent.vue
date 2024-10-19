<template>
  <div class="list-container" dir="ltr">
    <div class="row list-item px-1 py-3" v-for="item in items" :key="item">
      <div class="col-2">
        <input
          class="checkbox"
          type="checkbox"
          :value="item"
          :checked="modelValue.includes(item)"
          @change="updateModelValue(item, $event.target.checked)"
        />
      </div>
      <div class="col-10 item-name">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
    default: () => [], // Ensure modelValue is always an array
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateModelValue = (item, checked) => {
  const newValue = checked
    ? [...props.modelValue, item]
    : props.modelValue.filter((i) => i !== item);
  emit("update:modelValue", newValue);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
.list-container {
  max-height: 8rem;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 0.75rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 3rem; /* Adjust the height of each row */
}

.checkbox {
  transform: scale(1.5); /* Increase the size of the checkbox */
  margin-right: 0.5rem; /* Adjust margin to align properly */
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track-piece {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  background-color: #cbcbcb;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 0.1px solid #b7b7b7;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #909090;
}

.item-name {
  border-bottom: 1px solid #e0e0e0;
  padding-left: 0%;
  font-weight: 500;
  font-family: "Roboto";
  font-size: 1rem;
}
</style>
