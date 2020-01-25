import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'
import centralized from './centralized'
import createPersistedState from 'vuex-persistedstate';

Vue.use(VueAxios, axios)
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
  
    plugins: [createPersistedState()],
    modules: {
      central: centralized
    }    
  })

  return Store
}
