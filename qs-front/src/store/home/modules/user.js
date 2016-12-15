/**
 * Created by jason on 2016/12/14.
 */

import Vue from 'vue'
const SET_USER = 'SET_USER'
const UNSET_USER = 'UNSET_USER'


const state = {
  currentUser: null
}

const getters = {
  token: state => state.currentUser && state.currentUser.token,
  author: state => state.currentUser
}

const actions = {
  login({commit, state}, {email, password}) {
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.currentUser = user
  },
  [UNSET_USER] (state) {
    state.currentUser = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}