<template>
  <div class="wrap" dir="rtl">
    <div class="section-name">
      <h2 class="sect-name me-2">فیلترها</h2>
      <span class="text-danger" @click="deleteEmitter"> حذف فیلتر</span>
    </div>
    <hr />
    <h2 class="btn btn"></h2>
    <div class="filter-sizes">
      <h2 class="me-2">سایز</h2>
      <div class="filter-item">
        <SelectionComponent :items="sizes" v-model="selected.size" />
      </div>
    </div>
    <hr />
    <div class="filter-color not-first-filter">
      <h2 class="me-2">رنگ</h2>
      <div class="filter-item">
        <SelectionComponent v-model="selected.color" :items="colors" />
      </div>
    </div>
    <hr />
    <div class="avaiable" dir="rtl">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          v-model="availableOnly"
          @change="updateAvailableOnly"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">فقط محصولات موجود</label>
      </div>
    </div>
    <div class="filter-button">
      <q-btn unelevated rounded color="primary" label="اعمال فیلتر" @click="applyFilter" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import SelectionComponent from "./SelectionComponent.vue";

const props = defineProps({
  colors: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  availableOnly: {
    type: Boolean,
    required: true,
  },
  onColor: {
    type: Array,
    required: false,
  },
  onSize: {
    type: Array,
    required: false,
  },
});

const emit = defineEmits(["update:selected", "update:availableOnly", "applyFilter"]);

const availableOnly = ref(props.availableOnly);
const selected = ref({
  color: props.onColor || [],
  size: props.onSize || [],
});

const deleteEmitter = () => {
  emit("update:selected", { color: [], size: [] });
};

const updateAvailableOnly = () => {
  emit("update:availableOnly", availableOnly.value);
};

const applyFilter = () => {
  emit("update:selected", selected.value);
  emit("update:availableOnly", availableOnly.value);
  emit("applyFilter");
};
</script>

<style lang="css" scoped>
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
.wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  font-family: "IranYekanXVF", sans-serif;
  background-color: white;
  padding: 14px;
  font-size: 1rem;
  border-radius: 10px;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.sect -name {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 700;
  margin-top: 1rem;
}
.not-first-filter {
  width: 100%;
  margin-top: 2rem;
}
.filter-item {
  width: calc(100% - 4rem);
}

span:hover {
  cursor: pointer;
}

.filter-sizes {
  width: 100%;
}
hr {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid #ccc;
}

h2 {
  font-size: 1rem;
}

.filter-button {
  margin-top: 1rem;
}
</style>
