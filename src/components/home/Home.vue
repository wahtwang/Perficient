<template>
  <el-container style="height:100%;">
    <el-header class="home-header">
      <el-col class="menu-btn-col">
        <el-button @click="menuBtn" class="menu-btn">
          <i class="el-icon-menu" style="font-size:17px;vertical-align:middle;"></i>
        </el-button>
      </el-col>
      <el-col :sm="0" class="menu-btn-col" style="float:right;">
        <el-button @click="outLogin" class="menu-btn">
          <i class="three-aliicon_logout" style="font-size:17px;vertical-align:middle;"></i>
        </el-button>
      </el-col>
      <el-row style="overflow:hidden;" type="flex">
        <el-col :span="12" :xs="24" class="i-title-col">
          <i class="el-icon- i-title">
            <span>management system</span>
          </i>
        </el-col>
        <el-col :span="9" :xs="0" style="height:100%;">
          <el-input placeholder="搜索相关设备" size="small" style="margin-top:14px;width:250px" v-model="searchStr">
            <el-button icon="el-icon-search" slot="append"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" :xs="0" style="border-left:1px solid #e6e6e6;height:100%;text-align:center;line-height:60px;">
          <span>waht</span>
          <a href="jiavascript:;" style="margin-left:5px;">注销</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height:100%;overflow:hidden;position: relative;">
      <el-aside :class="asideClass">
        <el-menu
          :collapse="isCollapse"
          :router="true"
          class="el-menu-vertical-demo"
          default-active="1"
          style="background-color: rgba(255,255,255,0.95); height:100%;"
        >
          <el-menu-item index="/home/index">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/home/searchReserve">
            <i class="el-icon-menu"></i>
            <span slot="title">精确查询</span>
          </el-menu-item>
          <el-menu-item index="/home/personalMsg">
            <i class="three-aliyonghu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main @click.native="closeCollapse">
        <transition name="mask">
          <div class="mask" v-show="!isCollapse"></div>
        </transition>
        <transition name="router">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6" src="./js.js">
</script>

<style scoped src="./css.css">
</style>
