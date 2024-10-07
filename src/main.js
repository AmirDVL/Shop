import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Quasar, QPagination } from "quasar";
import "quasar/dist/quasar.css";

const app = createApp(App);

app.use(Quasar, {
  components: {
    QPagination,
  },
});

app.mount("#app");
