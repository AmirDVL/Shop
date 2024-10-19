<template>
  <div class="accordion" :id="accordionId">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'heading-' + accordionId">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse-' + accordionId"
          aria-expanded="false"
          :aria-controls="'collapse-' + accordionId"
        >
          انتخاب موارد
        </button>
      </h2>
      <div
        :id="'collapse-' + accordionId"
        class="accordion-collapse collapse"
        :aria-labelledby="'heading-' + accordionId"
      >
        <div class="accordion-body">
          <div class="table-container">
            <table class="table table-bordered">
              <thead></thead>
              <tbody class="scrollable-tbody">
                <tr v-for="item in items" :key="item">
                  <td>
                    <input
                      type="checkbox"
                      :value="item"
                      :checked="modelValue.includes(item)"
                      @change="updateModelValue(item, $event.target.checked)"
                    />
                  </td>
                  <td>{{ item }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

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

const accordionId = ref(`accordion-${Math.random().toString(36).substr(2, 9)}`);

const updateModelValue = (item, checked) => {
  const newValue = checked
    ? [...props.modelValue, item]
    : props.modelValue.filter((i) => i !== item);
  emit("update:modelValue", newValue);
};
</script>

<style scoped>
.table-container {
  max-height: 8rem; /* Adjust based on the height of 4 rows */
  overflow-y: auto;
}
.scrollable-tbody {
  display: block;
}
.scrollable-tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>
