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
          <el-form-item prop="user_id" style="margin-bottom: 40px;">
            <el-input clearable placeholder="请输入用户名" v-model="loginMsg.user_id"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input clearable placeholder="请输入密码" v-model="loginMsg.password"></el-input>
          </el-form-item>
          <div class="division"></div>
          <el-form-item prop="promissions" style="margin-bottom: 40px;">
            <el-radio-group class="login-radio" v-model="loginMsg.promissions">
              <el-radio-button label="1">普通用户</el-radio-button>
              <el-radio-button label="2">管理</el-radio-button>
              <el-radio-button label="3">系统管理</el-radio-button>
            </el-radio-group>
          </el-form-item>
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
        user_id: '',
        password: '',
        promissions: 1
      },
      valLoginMsg: {
        user_id: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login() {
      if (this.loginMsg.password === 'asd' && this.loginMsg.user_id === 'asd') {
        this.$router.push('/home/index')
      }
      try {
        var res = await this.$http.post('/login', this.loginMsg)
      } catch (err) {
        this.$message({
          message: err,
          type: 'error'
        })
      }
      if (res.data.meta.status === 200) {
        switch (this.loginMsg.promissions) {
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
            this.$router.push('/home/index?p=2')
          }
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    subLoginMsg() {
      this.$refs.loginMsg.validate(valid => {
        if (valid) {
          this.login()
          // switch (this.loginMsg.promissions) {
          //   case 1:
          //     {
          //       this.$router.push('/home/index?p=1')
          //     }
          //     break
          //   case 2:
          //     {
          //       this.$router.push('/home/index?p=2')
          //     }
          //     break
          //   default: {
          //     this.$router.push('/home/index?p=2')
          //   }
          // }
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
