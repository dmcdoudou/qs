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
  token: state => state.token || localStorage.getItem('token'),
  author: state => state.currentUser
}

const actions = {
  [types.SET_TOKEN]({commit}, token) {
    localStorage.setItem('token', token)
    commit(types.SET_TOKEN, token)
  },
  [types.UNSET_TOKEN]({commit}){
    localStorage.removeItem('token')
    commit(types.UNSET_TOKEN)
  },
  [types.REGISTER]({commit, dispatch, state}, {email, password, captcha}) {
    return req.post('/account/register', {email, password, captcha, salt: state.salt}).then(res => {
      if (!res.error) {
        commit(types.SET_USER, res.user)
        dispatch(types.SET_TOKEN, res.token)
      }
      return res
    })
  },
  [types.LOGIN]({commit, dispatch}, {email, password}){
    return req.post('/account/login', {email, password}).then(res => {
      if(!res.error) {
	        commit(types.SET_USER, res.user)
	        dispatch(types.SET_TOKEN, res.token)
      }
      return res
    })
  },
  [types.SEND_VALIDATE_EMAIL]({commit}, email){
    const salt = new Date().getMilliseconds()
    return req.post('/account/send/validate/email', {email, salt}).then(res => {
      commit(types.SET_SALT, salt)
      return res
    })
  },
  [types.LOGOUT]({commit,dispatch}){
    commit(types.UNSET_USER)
    dispatch(types.UNSET_TOKEN)
  },
  [types.RESUME]({dispatch, commit, state}) {
    let token = state.token || localStorage.getItem('token')
    if (!!token) {
      return req.get('/account/resume').then(res => {
        if (!res.error) {
	        commit(types.SET_USER, res.user)
	        dispatch(types.SET_TOKEN, token)
        }else {
          dispatch(types.UNSET_TOKEN)
        }
        return res
      })
    }
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
  
}

export default {
  state,
  getters,
  actions,
  mutations
}