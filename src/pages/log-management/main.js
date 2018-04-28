import Vue from 'vue';
import App from './App';
import VueCookie from 'vue-cookie';
import 'jcloud-ele-ui/lib/theme-jcloud/base.css';
import 'jcloud-ele-ui/lib/theme-jcloud/reset.css';

Vue.config.productionTip = false;
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});