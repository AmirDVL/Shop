import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  Quasar,
  QPagination,
  QBtn,
  QCheckbox,
  QList,
  QExpansionItem,
  QCard,
  QCardSection,
} from "quasar";
import langFA from "quasar/lang/fa";
import "quasar/dist/quasar.css";
import { ArrowDownIcon, Languages } from "lucide-vue-next";

import router from "./router";

const app = createApp(App);

app.use(Quasar, {
  components: {
    QPagination,
    QBtn,
    ArrowDownIcon,
    QCheckbox,
    QExpansionItem,
    QCard,
    QCardSection,
    QList,
  },
  config: {
    lang: langFA,
  },
});

app.use(router);

app.mount("#app");
