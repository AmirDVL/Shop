import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Quasar, QPagination, QBtn, QCheckbox } from "quasar";
import "quasar/dist/quasar.css";
import { ArrowDownIcon } from "lucide-vue-next";

const app = createApp(App);

app.use(Quasar, {
  components: {
    QPagination,
    QBtn,
    ArrowDownIcon,
    QCheckbox,
  },
});

app.mount("#app");
