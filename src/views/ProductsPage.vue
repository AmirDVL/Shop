<script setup lang="js">
import { ref, onBeforeMount } from 'vue';
import HeadComponent from "../components/HeadComponent.vue";
import MainMenu from "../components/MainMenu.vue";
import ProductDisplay from "../components/ProductDisplay.vue";
import PaginationComponent from '../components/PaginationComponent.vue';
import SpinnerComponent from '../components/SpinnerComponent.vue';
import PaginationComponentV2 from '@/components/PaginationComponentV2.vue';

const products = ref([]);
const isLoading = ref(true);
const totalPages = ref();
const currentPage = ref(1);
const options = { method: 'GET' };

const fetchProducts = async (page) => {
  try {
    const url = `https://demo.spreecommerce.org/api/v2/storefront/products?per_page=12&include=product_properties%2Cimages&page=${page}`;
    const response = await fetch(url, options);
    const data = await response.json();
    isLoading.value = false;
    totalPages.value = data.meta.total_pages;

    const imageMap = new Map();
    data.included.forEach(item => {
      if (item.type === 'image') {
        imageMap.set(item.id, item.attributes.styles[2].url);
      }
    });

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

const handlePageUpdate = (page) => {
  currentPage.value = page;
  isLoading.value = true;
  fetchProducts(page);
};

onBeforeMount(() => {
  fetchProducts(currentPage.value);
});
</script>

<template>
  <HeadComponent />
  <MainMenu />
  <SpinnerComponent v-if="isLoading" />
  <div class="container" v-else>
    <div class="row justify-content-between g-3 p-2">
      <ProductDisplay
        v-for="product in products"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
      />
    </div>
    <PaginationComponent
      :totalPages="totalPages"
      :currentPage="currentPage"
      @updatePage="handlePageUpdate"
    />
    <PaginationComponentV2 :currentPage="currentPage" :totalPages="totalPages" :url="url" />
  </div>
</template>

<style>
@import url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/");
/* Add any styles specific to ProductsPage here */
</style>
