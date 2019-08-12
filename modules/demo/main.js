import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(ElementUI, { locale });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
