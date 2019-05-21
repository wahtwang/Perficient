<template>
  <div class="container Personal-msg">
    <div class="user-msg-list-container">
      <div class="name-title">
        <span>您好！</span>
        <span v-text="userMsgList.name"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改姓名:</span>
          <span class="item-val">
            <el-input placeholder="请输入修改后的内容" size="small" v-model="changeUserMsg.name"></el-input>
          </span>
        </div>
      </transition>
      <div class="item">
        <span class="label">用户名:</span>
        <span class="item-val" v-text="userMsgList.user_id"></span>
      </div>
      <div class="item">
        <span class="label">性别:</span>
        <span class="item-val" v-text="userMsgList.sex"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改性别:</span>
          <span class="item-val">
            <el-input placeholder="请输入修改后的内容" size="small" v-model="changeUserMsg.sex"></el-input>
          </span>
        </div>
      </transition>
      <div @click="passwordSildeDown" class="item" style="cursor:pointer">
        <span class="label">用户密码:</span>
        <span class="item-val" style="vertical-align:middle">
          <a style="vertical-align:middle" v-text="changePasswordLabel"></a>
          <i :class="passwordArrowClass" style="margin-right:-15%;vertical-align:middle;float:right;"></i>
        </span>
      </div>
      <transition name="expend">
        <div class="item-expend password" v-if="slideExpendPassword">
          <div>
            <span class="label">旧密码:</span>
            <span class="item-val">
              <el-input placeholder="请输入原密码" size="small" v-model="oldPassword"></el-input>
            </span>
          </div>
          <div>
            <span class="label">新密码:</span>
            <span class="item-val">
              <el-input placeholder="请输入新密码" size="small" v-model="newPassword"></el-input>
            </span>
          </div>
          <div style="text-align:center;margin-top:20px;">
            <el-button @click="submitNewPassword" size="mini" type="primary">提交新密码</el-button>
          </div>
        </div>
      </transition>
      <div class="item">
        <span class="label">部门:</span>
        <span class="item-val" v-text="userMsgList.department"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改部门:</span>
          <span class="item-val">
            <el-input placeholder="请输入修改后的内容" size="small" v-model="changeUserMsg.department"></el-input>
          </span>
        </div>
      </transition>
      <div class="item">
        <span class="label">联系电话:</span>
        <span class="item-val" v-text="userMsgList.phone"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改电话:</span>
          <span class="item-val">
            <el-input placeholder="修改后的联系电话" size="small" v-model="changeUserMsg.phone"></el-input>
          </span>
        </div>
      </transition>
      <div class="item">
        <span class="label">邮箱:</span>
        <span class="item-val" v-text="userMsgList.email"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改邮箱:</span>
          <span class="item-val">
            <el-input placeholder="修改后的联系邮箱" size="small" v-model="changeUserMsg.email"></el-input>
          </span>
        </div>
      </transition>
      <div class="change">
        <p>
          <i :class="arrowClass"></i>
        </p>
        <span @click="slideDown" class="slideLabel" v-text="slideDownText"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { constants } from 'crypto'
import { type } from 'os'
export default {
  created() {
    this.getUserMsg()
  },
  data() {
    return {
      changePasswordLabel: '修改密码',
      slideExpendPassword: false,
      userMsgList: {
        name: '王煜辉',
        user_id: '603225315',
        sex: '男',
        department: '第二十督导组',
        phone: '15925895807',
        email: '603225315@qq.com'
      },
      passwordArrowClass: 'el-icon-arrow-right arrow',
      oldPassword: '',
      newPassword: '',
      slideExpend: false,
      arrowClass: 'el-icon-arrow-down arrow',
      slideDownText: '修改个人资料',
      changeUserMsg: {
        name: '',
        sex: '',
        department: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    passwordSildeDown() {
      this.slideExpendPassword = !this.slideExpendPassword
      if (this.slideExpendPassword) {
        this.passwordArrowClass = 'el-icon-arrow-right arrow' + ' ' + 'rotatep'
      } else {
        this.passwordArrowClass = 'el-icon-arrow-right arrow'
      }
    },
    async submitNewPassword() {
      if (this.slideExpendPassword) {
        try {
          var res = await this.$http.put('/user/updateUserpasswd', {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
        } catch (err) {
          this.$message({
            message: '修改失败' + err,
            type: 'error',
            duration: 1000
          })
          res = {}
          res.data = {}
          res.data.meta = err
            .toString()
            .slice(err.toString().length - 3, err.toString().length)
        }
        if (res.data.meta.status === 200) {
          this.slideExpendPassword = false
          if (this.slideExpendPassword) {
            this.passwordArrowClass =
              'el-icon-arrow-down arrow' + ' ' + 'rotate'
          } else {
            this.passwordArrowClass = 'el-icon-arrow-down arrow'
          }
          this.$message({
            message: res.data.meta.message,
            type: 'success',
            duration: 1000
          })
          this.oldPassword = this.newPassword = ''
        } else {
          this.$message({
            message: res.data.meta.message,
            type: 'error',
            duration: 1000
          })
        }
      }
    },
    rotate() {
      //旋转按钮
      if (this.slideExpend) {
        this.arrowClass = 'el-icon-arrow-down arrow' + ' ' + 'rotate'
      } else {
        this.arrowClass = 'el-icon-arrow-down arrow'
      }
    },
    changeSlideText() {
      if (this.slideExpend) {
        this.slideDownText = '提交个人资料'
      } else {
        this.slideDownText = '修改个人资料'
      }
    },
    async getUserMsg() {
      try {
        var res = await this.$http.get('/user/getUserInfor', {
          params: { user_id: localStorage.getItem('user_id') }
        })
      } catch (err) {
        this.$message({
          message: '请检查网络问题' + err,
          type: 'error',
          duration: 1000
        })
      }
      if (res.data.meta.status === 200) {
        this.userMsgList = res.data.data.user
      }
    },
    async updateUserMsg() {
      try {
        var res = await this.$http.put(
          '/user/changeUserInfo',
          this.changeUserMsg
        )
      } catch (err) {
        this.$message({
          message: '修改失败' + err,
          type: 'error',
          duration: 1000
        })
        res = {}
        res.data = {}
        res.data.meta = err
          .toString()
          .slice(err.toString().length - 3, err.toString().length)
      }
      if (res.data.meta.status === 200) {
        this.userMsgList.phone = this.changeUserMsg.phone
        this.userMsgList.email = this.changeUserMsg.email
        this.userMsgList.name = this.changeUserMsg.name
        this.userMsgList.sex = this.changeUserMsg.sex
        this.userMsgList.department = this.changeUserMsg.department
        localStorage.setItem('name', this.userMsgList.name)
        this.$store.state.change += 1
        this.slideExpend = false
        this.rotate()
        this.changeSlideText()
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      }
    },
    slideDown() {
      if (!this.slideExpend) {
        this.changeUserMsg.phone = this.userMsgList.phone
        this.changeUserMsg.email = this.userMsgList.email
        this.changeUserMsg.department = this.userMsgList.department
        this.changeUserMsg.sex = this.userMsgList.sex
        this.changeUserMsg.name = this.userMsgList.name
        this.changeUserMsg.user_id = localStorage.getItem('user_id')
        this.slideExpend = true
        this.rotate()
        this.changeSlideText()
      } else {
        this.updateUserMsg()
      }
    }
  }
}
</script>

<style src="./PersonalMsg.css" scoped>
</style>
