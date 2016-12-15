/**
 * Created by jason on 2016/12/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
  },
  strict: true,
  plugins: debug ? [createLogger()] : []
})