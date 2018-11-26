import Vue from 'vue'
import Vuex from 'vuex'
import config from './assets/js/config/index'
import tools from './assets/js/tools'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      domain:config.uri.protocol+config.uri.appUrl+config.uri.colon+config.uri.port+config.uri.et,
      tools:tools
  },
  mutations: {

  },
  actions: {

  }
})