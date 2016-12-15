<template>
    <div>
        <div id="container">
            <el-menu id="menu" default-active="1" @select="handleSelect" mode="horizontal" >
                <li class="el-menu-item logo">
                    <img src="~src/images/logo.png" alt="">
                </li>
                <el-menu-item index="1">启动系统</el-menu-item>
                <el-menu-item index="2">官方论坛</el-menu-item>
                <el-menu-item index="3">黑科技NEWS</el-menu-item>
                <li class="el-menu-item log-btn-group">
                    <el-button @click.native="register" icon="fa-user-plus">注册</el-button>
                    <el-button @click.native="login" icon="fa-sign-in">登录</el-button>
                </li>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="babel">
	export default {
	  name: 'Nav',
		data() {
	    return {
	    }
		},
		methods: {
	    login() {
	      this.$router.push('/login')
      },
      register() {
	      this.$router.push('/register')
      },
	    handleSelect(index) {

	      if(index === "1") {
            this.$router.replace('/')
        }
	    }
		}
	}
</script>

<style scoped lang="less">
    #container {
        background-color: white;
        box-shadow: 1px 1px 5px lightgrey;
        border-bottom: none;
        display: flex;
        justify-content: center;
        align-items:center;
    }
    #menu {
        max-width: 968px;
        min-width: 650px;
        background-color: white;
        flex-grow: 1;
    }
    .logo {
        &, &:hover{
            border-bottom: none !important;
            padding: 5px !important;
            background: white !important;
            cursor:default;
        }
    }

    .log-btn-group{
        &, &:hover{
            border-bottom: none !important;
            background: white !important;
            float: right !important;
        }
    }
</style>