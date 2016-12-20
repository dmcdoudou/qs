/**
 * Created by jason on 2016/12/20.
 */
import store from 'src/store/home/'
import * as types from 'src/store/home/types'
export const loggedIn = async () => {
	// return !!store.getters.author
	if(!!store.getters.author) {
		return true
	}else if (!!store.getters.token){
		// console.log(store.getters.token)
		let res = await store.dispatch(types.RESUME)
		return !res.error
	}else {
		return false
	}
}


export const resume = () => {
	store.dispatch(types.RESUME)
}