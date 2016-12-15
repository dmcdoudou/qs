/**
 * Created by jason on 2016/12/14.
 */

import Vue from 'vue'
const SET_USER = 'SET_USER'
const UNSET_USER = 'UNSET_USER'
const SET_SALT = 'SET_SALT'

const state = {
  currentUser: null,
  salt: null
}

const getters = {
  token: state => state.currentUser && state.currentUser.token,
  author: state => state.currentUser
}

const actions = {
  login({commit, state}, {email, password}) {
    Vue.http.post('/api/account/login', {email, password}).then(res => {
      commit(SET_USER, res.data)
    }).catch(res => {
      console.log(res.data)
    })
  },
  sendValidateEmail({commit}, email){
    const salt = new Date().getMilliseconds()
    Vue.http.post('/api/account/send/validate/email', {email, salt}).then(() => {
      commit(SET_SALT, salt)
    }).catch(res => {
      console.log(Vue.http)
      Vue.prototype.$message({
        type: 'error',
        message: 'asdf'
      })
      console.log(res.data)
    })
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.currentUser = user
  },
  [UNSET_USER] (state) {
    state.currentUser = null
  },
  [SET_SALT] (state, salt) {
    state.salt = salt
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}