<template>
  <div class="wrap" dir="rtl">
    <div class="section-name w-100 my-2">
      <h2 class="sect-name me-2">فیلترها</h2>
      <span class="text-danger" @click="deleteEmitter"> حذف فیلتر</span>
    </div>
    <hr />
    <div v-for="(items, filterKey) in filters" :key="filterKey" class="filter-section" dir="ltr">
      <div class="filter-header" @click="toggleAccordion(filterKey)">
        <h2 class="me-2 fs-4 filter-name">{{ filterKey }}</h2>
        <span class="dropdown-icon">{{ isOpen(filterKey) ? "▼" : "▶" }}</span>
      </div>
      <Transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-if="isOpen(filterKey)" class="filter-item">
          <SelectionComponent
            :items="items"
            :modelValue="selected[filterKey]"
            @update:modelValue="updateSelected(filterKey, $event)"
          />
        </div>
      </Transition>
      <hr />
    </div>
    <div class="avaiable w-100" dir="rtl">
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
  filters: {
    type: Object,
    required: true,
  },
  availableOnly: {
    type: Boolean,
    required: true,
  },
  onSelected: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits([
  "update:selected",
  "update:availableOnly",
  "applyFilter",
  "clearFilters",
]);

const availableOnly = ref(props.availableOnly);
const selected = ref(props.onSelected || {});
const openSections = ref({});

const toggleAccordion = (filterKey) => {
  openSections.value[filterKey] = !openSections.value[filterKey];
};

const isOpen = (filterKey) => {
  return openSections.value[filterKey];
};

const deleteEmitter = () => {
  emit("clearFilters");
};

const updateAvailableOnly = () => {
  emit("update:availableOnly", availableOnly.value);
};

const updateSelected = (filterKey, value) => {
  selected.value[filterKey] = value;
  emit("update:selected", selected.value);
};

const applyFilter = () => {
  emit("update:selected", selected.value);
  emit("update:availableOnly", availableOnly.value);
  emit("applyFilter");
};

// Transition hooks
const beforeEnter = (el) => {
  el.style.maxHeight = "0";
};

const enter = (el, done) => {
  el.style.transition = "max-height 0.3s ease";
  el.style.maxHeight = el.scrollHeight + "px";
  done();
};

const afterEnter = (el) => {
  el.style.maxHeight = "none";
};

const beforeLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + "px";
};

const leave = (el, done) => {
  el.style.transition = "max-height 0.3s ease";
  el.style.maxHeight = "0";
  done();
};

const afterLeave = (el) => {
  el.style.maxHeight = "none";
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

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
.sect-name {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 700;
  margin-top: 1rem;
}
.not-first-filter {
  width: 100%;
  margin-top: 2rem;
}
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter-item {
  width: 100%;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

span:hover {
  cursor: pointer;
}

.item-name {
  font-family: "roboto", sans-serif;
}

.filter-section {
  width: 100%;
}

.filter-name {
  font-weight: 400;
  font-family: "Roboto";
}

.filter-sizes {
  width: 100%;
}
hr {
  width: 100%;
  margin: 0;
  border: 0;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}

hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1rem;
  line-height: 2rem;
}

.section-name {
  display: flex;
  align-items: center;
  text-align: center;
  flex-grow: 1;
}
.section-name :last-child {
  margin-right: auto;
  font-weight: 300;
  line-height: 3.75rem;
  letter-spacing: -0.00833em;
}

.filter-button {
  margin-top: 1rem;
}

.dropdown-icon {
  transition: transform 0.3s ease;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter,
.accordion-leave-to {
  max-height: 0;
}
</style>
