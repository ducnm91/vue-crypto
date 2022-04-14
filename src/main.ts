import { createApp } from "vue";
import { createPinia } from "pinia";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'



import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component('vue-select', vSelect)
app.component('vue-slider', VueSlider)

app.use(createPinia());
app.use(router);

app.mount("#app");
