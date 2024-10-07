<template>
  <div class="MenuItem col-xl-auto col-md-3">
    <a :href="link">{{ text }}</a>
  </div>
</template>

<script>
// import { Props } from "vue";

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
.MenuItem {
  display: flex;
  /* height: 30px; */
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  text-align: center;
}
.MenuItem a {
  text-decoration: none;
  color: inherit;
}
.MenuItem a:hover {
  text-decoration: underline;
  color: red;
}
</style>
