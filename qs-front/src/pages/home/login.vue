<template>
    <div class="container">
        <qs-box title="登录青霜科技" class="wow fadeInDown">
            <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="邮箱" prop="email" ref="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="onSubmit">登录</el-button>
                    <el-button type="danger" @click.native="onReset">重填</el-button>
                </el-form-item>
            </el-form>
        </qs-box>
    </div>
</template>


<script lang="babel">
    import Box from '../../components/box'
    import * as types from '../../store/home/types'
    import { mapActions } from 'vuex'
    export default {
      data() {
        return {
          form: {
            email: '',
            password: '',
          },
          rules: {
            email: [{
              required: true, message: "邮箱不能为空", trigger: 'blur'
            }, {
              type: 'email', message: '邮箱地址不正确', trigger: 'blur'
            }],
            password: [{
              required: true, message: '密码不能为空', trigger: 'blur'
            }, {
              min: 6, max: 15, message: '密码必须在6-15位', trigger: 'blur'
            }],
          }
        }
      },
      methods: {
        onSubmit() {
          this.$refs.form.validate(result => {

          	if (!result) return
            this[types.LOGIN](this.form).then(res => {
            	if (!res.error) {
                this.$router.push('/')
	            }
            })
          })
        },
        onReset() {
          this.$refs.form.resetFields()
        },
        ...mapActions([types.LOGIN])
      },
      mounted() {
        new WOW().init()
      },
      components: {
        'qs-box': Box
      }
    }
</script>


<style lang="less" scoped>
    .container {
        margin: 100px auto 0px;

    }
    .form {
        width: 80%;
        margin: 20px auto ;
    }


</style>