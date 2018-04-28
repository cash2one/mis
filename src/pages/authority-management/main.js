import Vue from 'vue';
import App from './App';
import VueCookie from 'vue-cookie';
import 'jcloud-ele-ui/lib/theme-jcloud/base.css';
import 'jcloud-ele-ui/lib/theme-jcloud/reset.css';
import {Loading} from 'jcloud-ele-ui';

Vue.config.productionTip = false;
Vue.use(VueCookie);
Vue.use(Loading.directive);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});