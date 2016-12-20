/**
 * Created by jason on 2016/12/14.
 */

import * as req from 'src/utils/req'
import * as types from '../types'


const state = {
  currentUser: null,
  salt: null,
  token: null
}

const getters = {
  token: state => state.token,
  author: state => state.currentUser
}

const actions = {
  [types.SET_TOKEN]({commit}, token) {
    localStorage.setItem('token', token)
    commit(types.SET_TOKEN, token)
  },
  [types.REGISTER]({commit, dispatch, state}, {email, password, captcha}) {
    req.post('/account/register', {email, password, captcha, salt: state.salt}).then(res => {
      if (!res.error) {
        commit(types.SET_USER, res.user)
        dispatch(types.SET_TOKEN, res.token)
      }
    })
  },
  [types.LOGIN]({commit, dispatch}, {email, password}){
    req.post('/account/login', {email, password}).then(res => {
      if(!res.error) {
	        commit(types.SET_USER, res.user)
	        dispatch(types.SET_TOKEN, res.token)
      }
    })
  },
  [types.SEND_VALIDATE_EMAIL]({commit}, email){
    const salt = new Date().getMilliseconds()
    req.post('/account/send/validate/email', {email, salt}).then(() => {
      commit(types.SET_SALT, salt)
    })
  },
  [types.LOGOUT]({dispatch}){
    dispatch(types.LOGOUT)
  }

}

const mutations = {
  [types.SET_USER] (state, user) {
    state.currentUser = user
  },
  [types.UNSET_USER] (state) {
    state.currentUser = null
  },
  [types.SET_SALT] (state, salt) {
    state.salt = salt
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.UNSET_TOKEN] (state) {
    state.token = null
  },
  [types.LOGOUT] (state){
    state.token = null
    state.currentUser = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}