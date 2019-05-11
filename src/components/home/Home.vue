<template>
  <el-container style="height:100%;">
    <el-header class="home-header" style="position:relative;">
      <div :class="searchBtn" @click="searchBtnM">
        <i class="el-icon-search" style="font-size: 10px;line-height:15px;vertical-align: text-top;font-weight: 1000;"></i>
      </div>
      <el-col class="menu-btn-col">
        <el-button @click="menuBtn" class="menu-btn">
          <i class="el-icon-menu" style="vertical-align:middle;"></i>
        </el-button>
      </el-col>
      <el-col :sm="0" class="menu-btn-col" style="float:right;">
        <el-button @click="outLogin" class="menu-btn">
          <i class="three-aliicon_logout" style="vertical-align:middle;"></i>
        </el-button>
      </el-col>
      <el-row style="overflow:hidden;" type="flex">
        <el-col :span="12" :xs="24" class="i-title-col">
          <i class="el-icon- i-title">
            <span>设备资源预约管理系统</span>
          </i>
        </el-col>
        <el-col :span="9" :xs="0" style="height:100%;">
          <el-input
            :class="isShow"
            @keyup.native="fuzzySearch"
            placeholder="输入相关设备信息"
            prefix-icon="el-icon-search"
            size="small"
            style="margin-top:14px;width:250px;transition: all 1s;"
            v-model="equip"
          ></el-input>
        </el-col>
        <el-col :span="3" :xs="0" style="border-left:1px solid #e6e6e6;height:100%;text-align:center;line-height:60px;">
          <span>{{name ? name:'waht'}}</span>
          <a @click="outLogin" href="jiavascript:;" style="margin-left:5px;">注销</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height:100%;overflow:hidden;position: relative;">
      <el-aside :class="asideClass">
        <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          :router="true"
          class="el-menu-vertical-demo"
          ref="menu"
          style="background-color: rgba(255,255,255,0.95); height:100%;"
        >
          <el-menu-item index="/home/index">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/home">
            <template slot="title">
              <i class="three-aliyudingchenggong" style="font-size:17px;"></i>
              <span>查询与预定</span>
            </template>
            <el-menu-item index="/home/fuzzySearch">
              <i class="el-icon-zoom-out"></i>
              <span slot="title">关键字查询</span>
            </el-menu-item>
            <el-menu-item index="/home/searchReserve">
              <i class="el-icon-zoom-in"></i>
              <span slot="title">精确查询</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/hasOlder">
            <i class="three-aliyundanyuyue" style="font-weight:1000;"></i>
            <span slot="title">已预约</span>
          </el-menu-item>
          <el-menu-item index="/home/personalMsg">
            <i class="three-aliyonghu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/home/equipInfo">
            <i class="el-icon-setting"></i>
            <span slot="title">设备信息</span>
          </el-menu-item>
          <el-menu-item index="/home/permissionEdit">
            <i class="three-aliquanxian"></i>
            <span slot="title">修改权限</span>
          </el-menu-item>
          <el-menu-item index="/home/projectInfo">
            <i class="three-alixiangmuguanli"></i>
            <span slot="title">项目信息</span>
          </el-menu-item>
          <el-menu-item index="/home/backUp">
            <i class="three-alishujubeifenhuifu" style="font-weight:1000;"></i>
            <span slot="title">备份</span>
          </el-menu-item>
          <el-menu-item index="/home/log">
            <i class="el-icon-document"></i>
            <span slot="title">日志</span>
          </el-menu-item>
          <el-menu-item index="/home/dataDetails">
            <i class="three-alishuju"></i>
            <span slot="title">后台数据</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <transition name="mask">
        <div @click="closeCollapse" class="mask" v-show="!isCollapse"></div>
      </transition>
      <!-- 使router-view width:100%的时候能对照父元素宽度，并且在位移时去掉底部滚动条，并且把原本的内边距去掉，因为子元素为ab时候会从外框定位 -->
      <el-main ref="main" style="position:relative;padding: 0;overflow-x: hidden;">
        <transition name="router">
          <router-view class="router-container"/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6" src="./js.js">
</script>

<style scoped src="./css.css">
</style>
