import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store, key} from './store'
import HighchartsVue from 'highcharts-vue';

createApp(App).use(store, key).use(router).use(HighchartsVue).mount('#app')
