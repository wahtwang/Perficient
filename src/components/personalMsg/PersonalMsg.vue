<template>
  <div class="container Personal-msg">
    <div class="user-msg-list-container">
      <div class="name-title">
        <span>您好！</span>
        <span v-text="userMsgList.relName"></span>
      </div>
      <div class="item">
        <span class="label">用户名:</span>
        <span class="item-val" v-text="userMsgList.userId"></span>
      </div>
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
      <div class="item">
        <span class="label">职位:</span>
        <span class="item-val" v-text="userMsgList.position"></span>
      </div>
      <div class="item">
        <span class="label">项目组:</span>
        <span class="item-val" v-text="userMsgList.project"></span>
      </div>
      <div class="item">
        <span class="label">联系电话:</span>
        <span class="item-val" v-text="userMsgList.phoneNumber"></span>
      </div>
      <transition name="expend">
        <div class="item-expend" v-if="slideExpend">
          <span class="label">修改电话:</span>
          <span class="item-val">
            <el-input placeholder="修改后的联系电话" size="small" v-model="changeUserMsg.changePhoneNumber"></el-input>
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
            <el-input placeholder="修改后的联系邮箱" size="small" v-model="changeUserMsg.changeEmail"></el-input>
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
        relName: '管理员',
        userId: '603225315',
        project: '精密器械研究项目',
        department: '第二十督导组',
        position: '第二十督导组督导',
        phoneNumber: '15925895807',
        email: '603225315@qq.com'
      },
      passwordArrowClass: 'el-icon-arrow-right arrow',
      oldPassword: '',
      newPassword: '',
      slideExpend: false,
      arrowClass: 'el-icon-arrow-down arrow',
      slideDownText: '修改个人资料',
      changeUserMsg: {
        changePhoneNumber: '',
        changeEmain: ''
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
          params: { user_id: 888888 }
        })
      } catch (err) {
        this.$message({
          message: '请检查网络问题' + err,
          type: 'error',
          duration: 1000
        })
      }
    },
    async updateUserMsg() {
      try {
        var res = await this.$http.put(
          'user/changeUserInfor',
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
      if (res.data.meta === 200) {
        this.userMsgList.phoneNumber = changeUserMsg.changePhoneNumber
        this.userMsgList.email = changeUserMsg.changeEmail
        this.slideExpend = false
        this.rotate()
        this.changeSlideText()
      }
    },
    slideDown() {
      if (!this.slideExpend) {
        this.changeUserMsg.changePhoneNumber = this.userMsgList.phoneNumber
        this.changeUserMsg.changeEmail = this.userMsgList.email
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
