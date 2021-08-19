import Vue from 'vue'
import './plugins/fluid-storage'
import './plugins/bootstrap-vue'
//import './plugins/pij'
import './plugins/axios'

//import './plugins/custom/files-url'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Default from './layouts/Default.vue'
import Empty from './layouts/Empty.vue'
import i18n from './i18n'

Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)


Vue.config.productionTip = true



new Vue({
    router,
    store,
    i18n,
    render: function(h) { return h(App) }
}).$mount('#app')