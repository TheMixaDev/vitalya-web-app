import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
import Notifications from '@kyvg/vue3-notification'

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";

const app = createApp(App)

app.use(router)
app.use(VueCookies)
app.use(Notifications)
use([
    CanvasRenderer,
    PieChart
]);

app.mount('#app')
