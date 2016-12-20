<template>
    <div class="container">
        <qs-box title="注册青霜科技ID" class="wow fadeInDown">
            <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="邮箱" prop="email" ref="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                    <div class="captcha">
                        <el-input v-model="form.captcha" class="input" />
                        <el-button type="primary" class="btn" @click="getCaptcha">获取验证码</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm" required>
                    <el-input v-model="form.confirm" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="onSubmit">注册</el-button>
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
        const validatePassword = (rule, value, callback) => {
          if (value === '') callback(new Error('密码不能为空'))
          else {
            if (value.length < 6 || value.length > 15) callback(new Error('密码必须在6-15位'))
            else callback()
          }
        }
        const validateConfirm = (rule, value, callback) => {
          if (value === '') callback(new Error('请再次输入密码'))
          else if (value !== this.form.password) callback(new Error('两次输入密码不一致'))
          else callback()
        }

        return {
          form: {
            email: '',
            captcha: '',
            password: '',
            confirm: ''
          },
          rules: {
            email: [{
              required: true, message: "邮箱不能为空", trigger: 'blur'
            }, {
              type: 'email', message: '邮箱地址不正确', trigger: 'blur'
            }],
            captcha: [{
              required: true, message: "验证码不能为空", trigger: 'blur'
            }],
            password: [{
              validator: validatePassword, trigger: 'blur'
            }],
            confirm: [{
              validator: validateConfirm, trigger: 'blur'
            }]
          }
        }
      },
      methods: {
        onSubmit() {
          this.$refs.form.validate(result => {

          	if (!result) return
            this[types.REGISTER](this.form)
          })
        },
        onReset() {
          this.$refs.form.resetFields()
        },
        getCaptcha() {
          this.$refs.form.validateField('email', (err) => {
//            if(err) return
            this[types.SEND_VALIDATE_EMAIL](this.form.email)

          })
        },
        ...mapActions([types.REGISTER, types.SEND_VALIDATE_EMAIL])
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

    .captcha {
        display: flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
        .input {
            display: inline-block;
            flex-grow:1;
            margin-right: 5px;
        }
    }
</style>