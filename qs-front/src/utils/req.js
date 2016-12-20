/**
 * Created by jason on 2016/12/20.
 */
import store from 'src/store/home'
import axios from 'axios'
import Vue from 'vue'

/**
 * 单例axios
 */
let client

function getToken() {
	return store.getters.token
}

function getClient() {
	if (client) {
		return client
	}else{
		return client = axios.create({
			baseURL: '/api',
			headers: {
				'Authorization': `Bearer ${getToken()}`
			},
		})
	}
}

function filterError(err) {
	let data = err.response.data
	Vue.prototype.$message({
		type: 'error',
		message: data.message
	})
	return Promise.resolve({error: err.response.data})
}
function filterResponse(res) {
	return Promise.resolve(res.data)
}


export const post = (url, data, config) => {
	return getClient().post(url, data, {
		// global config
		...config
	}).then(filterResponse).catch(filterError)
}

export const get = (url, params, config) => {
	return getClient().get(url, {
		params: params,
		...config
	}).then(filterResponse).catch(filterError)
}


