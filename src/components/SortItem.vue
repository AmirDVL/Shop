<template>
  <div class="sort-item">
    <button @click="emitSortValue" :class="{ active: isActive }">{{ textValue }}</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  sortValue: {
    type: String,
    required: true,
  },
  textValue: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["update-sort"]);

const emitSortValue = () => {
  emit("update-sort", props.sortValue);
};
</script>

<style scoped>
@font-face {
  font-family: "IRANYekanXVF";
  src: url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/webfont/staticfonts/IRANYekanX-Regular.woff")
      format("woff-variations"),
    /* will be the standard and works in Safari now */
      url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/webfont/IRANYekanXVF.woff")
      format("woff");
  /* for the other supporting browsers */
  font-weight: 100 1000;
  font-display: fallback;
}
.sort-item {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.sort-item button {
  padding: 10px;
  border: none;
  font-size: 1rem;
  font-family: "IRANYekanXVF";
  border-bottom: 2px solid white;
  background: white;
}
.sort-item button:hover {
  border-bottom: 2px solid #a72f3b;
  cursor: pointer;
}
.sort-item button:active {
  border-bottom: 2px solid #a72f3b;
}
.sort-item button:focus {
  outline: none;
}

.active {
  border-bottom: 2px solid #a72f3b;
}
</style>
