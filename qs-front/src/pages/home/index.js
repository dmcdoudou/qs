import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'src/styles/global.less'
import store from 'src/store/home'


import Root from './root'
import Register from './register'
import Login from './login'
import App from './app'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)


const Foo = {template: '<div>Foo</div>'}
const Bar = {template: '<div>Bar</div>'}

const router = new VueRouter({
  mode: 'history',
  base: '/home',
  routes: [
    {path: '/', component: App},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar}
  ]
})


export const app = new Vue({ // eslint-disable-line
  el: '#app',
  store,
  router,
  render: h => h(Root)
});

// console.log(app.$store.state.user.token)

