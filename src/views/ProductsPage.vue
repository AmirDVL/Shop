<script setup lang="js">
import { ref, onBeforeMount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeadComponent from "../components/HeadComponent.vue";
import MainMenu from "../components/MainMenu.vue";
import ProductDisplay from "../components/ProductDisplay.vue";
import PaginationComponentV2 from '@/components/PaginationComponentV2.vue';
import SpinnerComponent from '../components/SpinnerComponent.vue';
import SortItem from '@/components/SortItem.vue';
import Filter from '@/components/Filter.vue';

const router = useRouter();
const route = useRoute();

const defaultSort = ''; // Define the default sorting option as an empty string
const activeSort = ref(defaultSort); // Initialize activeSort with the default sorting option
const sort = ref(defaultSort); // Initialize sort with the default sorting option

const products = ref([]);
const isLoading = ref(true);
const totalPages = ref();
const currentPage = ref(1);
const filters = ref({});
const availableOnly = ref(false);
const selected = ref({});

const options = { method: 'GET' };

const fetchProducts = async (page, sortValue, selectedFilters, available) => {
  try {
    let url = `https://demo.spreecommerce.org/api/v2/storefront/products?per_page=12&include=product_properties%2Cimages&page=${page}`;

    // Add sort value to the URL if it's not the default sort
    if (sortValue) {
      url += sortValue;
    }

    // Add dynamic filters to the URL
    Object.keys(selectedFilters).forEach(filterKey => {
      if (selectedFilters[filterKey].length) {
        url += `&filter[options][${filterKey}]=${selectedFilters[filterKey].join(',')}`;
      }
    });

    if (available) url += `&filter[available]=true`;
    console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    isLoading.value = false;
    totalPages.value = data.meta.total_pages;

    const imageMap = new Map();
    data.included.forEach(item => {
      if (item.type === 'image') {
        imageMap.set(item.id, item.attributes.styles[2].url);
      }
    });

    // Dynamically set filter options
    const dynamicFilters = {};
    data.meta.filters.option_types.forEach(optionType => {
      dynamicFilters[optionType.name] = optionType.option_values.map(option => option.name);
    });

    filters.value = dynamicFilters;

    products.value = data.data.map((product) => {
      const imageId = product.relationships.images.data.length > 0 ? product.relationships.images.data[0].id : null;
      const imageUrl = imageId ? imageMap.get(imageId) : '';
      return {
        id: product.id,
        name: product.attributes.name,
        description: product.attributes.description,
        price: product.attributes.price,
        image: imageUrl
      };
    });
  } catch (err) {
    console.error(err);
    isLoading.value = false;
  }
};

// Method to update the sort value and active sort
const updateSort = (newSortValue) => {
  sort.value = newSortValue;
  activeSort.value = newSortValue;
  applyFilter(); // Fetch products with the new sort value
};

// Method to update the current page
const updatePage = (newPage) => {
  currentPage.value = newPage;
  applyFilter(); // Fetch products when the page changes
};

// Method to apply filters
const applyFilter = () => {
  isLoading.value = true;
  fetchProducts(currentPage.value, sort.value, selected.value, availableOnly.value);
  updateQueryParams();
};

// Method to update the URL with query parameters
const updateQueryParams = () => {
  const query = {
    page: currentPage.value,
    ...Object.keys(selected.value).reduce((acc, key) => {
      acc[key] = selected.value[key].join(',');
      return acc;
    }, {}),
    available: availableOnly.value
  };

  // Add sort to the query if it's not the default sort
  if (sort.value) {
    query.sort = sort.value;
  }

  router.push({ query });
};

// Method to clear all filters
const clearFilters = () => {
  selected.value = {};
  availableOnly.value = false;
  applyFilter();
};

watch(route, (newRoute) => {
  currentPage.value = parseInt(newRoute.query.page) || 1;
  sort.value = newRoute.query.sort || defaultSort;
  activeSort.value = sort.value; // Ensure activeSort is updated
  Object.keys(filters.value).forEach(filterKey => {
    selected.value[filterKey] = newRoute.query[filterKey] ? newRoute.query[filterKey].split(',') : [];
  });
  availableOnly.value = newRoute.query.available === 'true';
  fetchProducts(currentPage.value, sort.value, selected.value, availableOnly.value);
}, { immediate: true });

onBeforeMount(() => {
  fetchProducts(currentPage.value, sort.value, selected.value, availableOnly.value);
});
</script>

<template>
  <div class="container">
    <HeadComponent />
    <MainMenu />
    <SpinnerComponent v-if="isLoading" />
    <div class="container" v-else>
      <div class="row">
        <div class="col-3">
          <Filter
            :filters="filters"
            :availableOnly="availableOnly"
            @update:selected="selected = $event"
            @update:availableOnly="availableOnly = $event"
            @applyFilter="applyFilter"
            @clearFilters="clearFilters"
            :on-selected="selected"
          />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-2">
              <SortItem
                sortValue=""
                textValue="پیش فرض"
                @update-sort="updateSort"
                :isActive="activeSort === ''"
              />
            </div>
            <div class="col-2">
              <SortItem
                sortValue="&sort=price"
                textValue="ارزان ترین"
                @update-sort="updateSort"
                :isActive="activeSort === '&sort=price'"
              />
            </div>
            <div class="col-2">
              <SortItem
                sortValue="&sort=-price"
                textValue="گران ترین"
                @update-sort="updateSort"
                :isActive="activeSort === '&sort=-price'"
              />
            </div>
            <div class="col-2">
              <SortItem
                sortValue="&sort=-updated_at"
                textValue="جدیدترین"
                @update-sort="updateSort"
                :isActive="activeSort === '&sort=-updated_at'"
              />
            </div>
          </div>
          <div class="row justify-between q-gutter-y-lg q-m" id="items">
            <ProductDisplay
              v-for="product in products"
              :key="product.id"
              :name="product.name"
              :price="product.price"
              :image="product.image"
              :id="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
    <PaginationComponentV2
      :modelValue="currentPage"
      :totalPages="totalPages"
      @update:modelValue="updatePage"
    />
  </div>
</template>

<style>
@import url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/");
.active {
  border-bottom: 2px solid #a72f3b !important;
}

#items > * {
  margin: 1 0.5rem;
}
</style>
