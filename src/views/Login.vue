<!--login-->
<template>
  <div
    id="login"
    v-loading="loading"
    element-loading-text="正在加载..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="0"
      class="form"
      :rules="rules"
    >
      <h3>系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="isPwd"
          v-model="form.password"
          placeholder="请输入密码"
          class="pwd"
        ></el-input
        ><i
          :class="
            isPwd === 'password' ? 'fa fa-eye-slash fa-lg' : 'fa fa-eye fa-lg'
          "
          @click="exchange"
        ></i>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model="form.code"
          placeholder="点击图片更换验证码"
          class="codeInput"
        ></el-input
        ><img :src="picUrl" class="codePic" @click="changePic" />
      </el-form-item>
      <el-checkbox v-model="isSelected" class="remmberMe">记住我</el-checkbox>
      <el-form-item class="loginBar">
        <el-button
          type="primary"
          @click="submitForm('form')"
          @keydown.enter.native="submitForm('form')"
          >登录</el-button
        ><el-button @click="loginForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        code: ''
      },
      // loading加载器
      loading: false,
      // 验证码
      picUrl: '/captcha?time=' + new Date(),
      // 是否记住密码
      isSelected: false,
      // 变化是否为密码
      isPwd: 'password',
      // 图标样式
      iconStyle: 'fa fa-eye-slash fa-lg',
      rules: {
        username: {
          trigger: 'blur',
          required: true,
          message: '用户名或者密码不正确'
        },
        password: { required: true, message: '密码不正确', trigger: 'blur' },
        code: { required: true, message: '请输入验证码', trigger: 'blur' }
      }
    }
  },
  created () {
    this.getCookie()
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    // 提交表单内容
    submitForm (form) {
      // 判断是否通过校验
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 通过校验
          // 提交表单
          this.loading = true
          this.postRequest('/login', this.form).then((res) => {
            if (res.code === 200) {
              const tokenStr = res.obj.tokenHead + res.obj.token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              this.$store.dispatch('token', res.obj.token)
              const path = this.$route.query.redirect
              this.$router.replace(
                path === '/' || path === undefined ? '/home' : path
              )
              this.loading = false
            } else {
              this.loading = false
            }
          })
        } else {
          // this.$message.error('请输入所有字段')
          return false
        }
      })
      // 记住密码就对账号和密码存放到cookie中
      if (this.isSelected) {
        this.setcookie(this.form.username, this.form.password, 7)
      }
    },
    loginForm () {
      // todo 注册功能实现
      console.log('注册')
      // todo 实现键盘enter登录
    },
    // 改变输入框密码type
    exchange () {
      if (this.isPwd === 'password') {
        this.isPwd = ''
      } else {
        this.isPwd = 'password'
      }
    },
    // 设置cookie
    setcookie (username, pwd, exdays) {
      const exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie =
        'username=' + username + ';path=/;expires=' + exdate.toUTCString()
      window.document.cookie =
        'password=' + pwd + ';path=/;expires=' + exdate.toUTCString()
    },
    // 获取cookie
    getCookie () {
      if (document.cookie.length > 0) {
        const str = document.cookie
        const arr = str.split('; ')
        // console.log(arr)
        console.log(str)
        for (let i = 0; i < arr.length; i++) {
          const newArr = arr[i].split('=')
          if (newArr[0] === 'username') {
            this.form.username = newArr[1]
          } else if (newArr[0] === 'password') {
            this.form.password = newArr[1]
          }
        }
      }
    },
    // 更换验证码图片
    changePic () {
      this.picUrl = '/captcha?time=' + new Date()
    }
  }
}
</script>
<style lang="less" scoped>
#login {
  /**
   background: var(--bgcolorDay);
   */
  background: var(--bgcolorDay);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  border-radius: 0.75rem;
  background-clip: padding-box;
  width: 17.5rem;
  padding: 0.75rem 1.75rem 0.75rem 1.75rem;
  background: #fff;
  border: 0.05rem solid #eaeaea;
  box-shadow: 0 0 1rem #000;
  h3 {
    padding: 0.5rem 0;
  }
  .fa {
    position: absolute;
    right: 0.5rem;
    top: 0.6rem;
  }
  .code {
    display: flex;
    align-items: center;
  }
  .codeInput {
    width: 65%;
    height: 2rem;
    right: 0;
    cursor: pointer;
  }
  .codePic {
    position: absolute;
    display: inline-block;
    right: 0.5rem;
    width: 5rem;
    height: 2rem;
  }
  NaNpxmberMe {
    margin-bottom: 0.5rem;
  }
  .el-button {
    width: 48%;
  }
}
</style>
