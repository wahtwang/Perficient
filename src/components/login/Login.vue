<template>
  <div style="height:100%;">
    <el-row align="middle" justify="center" style="height:83%;" type="flex">
      <el-col
        :lg="7"
        :md="8"
        :sm="10"
        :xl="5"
        :xs="23"
        style="text-align: center; background-color: #fff; padding: 30px 50px 20px; border-radius:10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
      >
        <span style="font-size: 37px; color: #000; letter-spacing: 10px; font-weight: 400;">登录</span>
        <el-form :model="loginMsg" :rules="valLoginMsg" label-position="top" label-width="80px" ref="loginMsg" style="margin-top: 30px;">
          <el-form-item prop="username" style="margin-bottom: 40px;">
            <el-input clearable placeholder="请输入用户名" v-model="loginMsg.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input clearable placeholder="请输入密码" v-model="loginMsg.password"></el-input>
          </el-form-item>
          <div class="division"></div>
          <el-form-item>
            <el-button @click="subLoginMsg" style="width:100%;" type="primary">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row align="middle" justify="center" style="height:7%;" type="flex">
      <span style="font-size:30px;color: #aaa;">设备资源管理</span>
    </el-row>
    <el-row align="middle" justify="center" style="height:5%;" type="flex">
      <span style="font-size:14px;color: #aaa;">@博克软件 Perficient China</span>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.subLoginMsg()
      }
    }
  },
  destroyed() {
    document.onkeydown = null
  },
  data() {
    return {
      loginMsg: {
        username: '',
        password: ''
      },
      valLoginMsg: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '账号格式不正确',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 8,
            max: 15,
            message: '长度在 8 到 15 个字符',
            trigger: 'blur'
          },
          {
            pattern: /[a-z]+[0-9]+/,
            message: '密码由数字和小写字母组成',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      // if (
      //   this.loginMsg.username === '888888' &&
      //   this.loginMsg.password === 'cs888888'
      // ) {
      //   this.$router.push('/home/index')
      // }
      try {
        var res = await this.$http.post('/login', this.loginMsg)
      } catch (err) {
        this.$message({
          message: err,
          type: 'error',
          duration: 1000
        })
      }
      if (res.data.meta.status === 200) {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('name', res.data.data.username)
        switch (res.data.data.promissions) {
          case 1:
            {
              this.$router.push('/home/index?p=1')
            }
            break
          case 2:
            {
              this.$router.push('/home/index?p=2')
            }
            break
          default: {
            this.$router.push('/home/index?p=3')
          }
        }
      } else {
        this.$message({
          message: res.data.meta.message,
          type: 'error',
          diration: 1000
        })
      }
    },
    subLoginMsg() {
      this.$refs.loginMsg.validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.division {
  height: 1px;
  background-color: #eee;
  margin-bottom: 30px;
  margin-top: 40px;
}
.login-radio {
  width: 100%;
}
.login-radio .el-radio-button {
  width: 33.3%;
}
.login-radio .el-radio-button__inner {
  width: 100% !important;
  padding: 5px 0 !important;
}
</style>
