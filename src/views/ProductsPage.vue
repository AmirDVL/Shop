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

const products = ref([]);
const isLoading = ref(true);
const totalPages = ref();
const currentPage = ref(1);
const activeSort = ref('');
const sort = ref("");
const colors = ref([]);
const sizes = ref([]);
const availableOnly = ref(false);
const selected = ref({
  color: [],
  size: [],
});
const options = { method: 'GET' };

const fetchProducts = async (page, sortValue, selected, available) => {
  try {
    let url = `https://demo.spreecommerce.org/api/v2/storefront/products?per_page=12&include=product_properties%2Cimages&page=${page}${sortValue}`;
    if (selected.color.length) url += `&filter[options][color]=${selected.color.join(',')}`;
    if (selected.size.length) url += `&filter[options][size]=${selected.size.join(',')}`;
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
    colors.value = data.meta.filters.option_types[0].option_values.map(option => option.name);
    sizes.value = data.meta.filters.option_types[1].option_values.map(option => option.name);
    console.log(sizes.value);
    products.value = data.data.map((product) => {
      const imageId = product.relationships.images.data.length > 0 ? product.relationships.images.data[0].id : null;
      const imageUrl = imageId ? imageMap.get(imageId) : '';
      return {
        id: product.id,
        name: product.attributes.name,
        description: product.attributes.description,
        price: product.attributes.display_price,
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
    sort: sort.value,
    color: selected.value.color.join(','),
    size: selected.value.size.join(','),
    available: availableOnly.value,
  };
  router.push({ query });
};

// Watch for changes in the route query parameters
watch(route, (newRoute) => {
  currentPage.value = parseInt(newRoute.query.page) || 1;
  sort.value = newRoute.query.sort || '';
  selected.value.color = newRoute.query.color ? newRoute.query.color.split(',') : [];
  selected.value.size = newRoute.query.size ? newRoute.query.size.split(',') : [];
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
            :colors="colors"
            :sizes="sizes"
            :availableOnly="availableOnly"
            @update:selected="selected = $event"
            @update:availableOnly="availableOnly = $event"
            @applyFilter="applyFilter"
            :on-color="selected.color"
            :on-size="selected.size"
          />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-2">
              <SortItem
                sortValue="&sort=price"
                textValue="ارزان ترین"
                @update-sort="updateSort"
                :isActive="activeSort"
              />
            </div>
            <div class="col-2">
              <SortItem
                sortValue="&sort=-price"
                textValue="گران ترین"
                @update-sort="updateSort"
                :isActive="activeSort"
              />
            </div>
            <div class="col-2">
              <SortItem
                sortValue="&sort=-updated_at"
                textValue="جدیدترین"
                @update-sort="updateSort"
                :isActive="activeSort"
              />
            </div>
          </div>
          <div class="row justify-between q-gutter-y-lg q-m">
            <ProductDisplay
              v-for="product in products"
              :key="product.id"
              :name="product.name"
              :price="product.price"
              :image="product.image"
            />
          </div>
        </div>
      </div>
    </div>
    <PaginationComponentV2
      v-model="currentPage"
      :totalPages="totalPages"
      @update:modelValue="updatePage"
    />
  </div>
</template>

<style>
@import url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/");
.active {
  border-bottom: 2px solid #a72f3b;
}
</style>
