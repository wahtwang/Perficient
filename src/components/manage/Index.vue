<template>
<div>
  <el-row style="padding-bottom:30px;" class="web-track">
  <el-col :span="7" v-for="(o, index) in 1"  :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/index/index_grxx.jpg" class="image">
      <div style="padding: 14px;">
        <span>个人信息更改快速通道</span>
        <div class="bottom clearfix">
         <span class="time">这里是个人信息更改快速通道</span>
         <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoPersonal">进入</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
  <el-col :span="7" v-for="(o, index) in 1" :offset="index > 0 ? 2 : 0" style="margin-left:20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/index/index_mhcc.jpg" class="image">
      <div style="padding: 14px;">
        <span>模糊查询预约快速通道</span>
        <div class="bottom clearfix">
          <span class="time">这里是模糊查询预约快速通道</span>
          <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoFuzzy">进入</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
   <el-col :span="8" v-for="(o, index) in 1" :offset="index > 0 ? 2 : 0" style="margin-left:20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/index/index_jqcc.jpg" class="image">
      <div style="padding: 14px;">
        <span>精确查询预约快速通道</span>
        <div class="bottom clearfix">
          <span class="time">这里是精确查询预约快速通道</span>
          <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoSearch">进入</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

<div class="phone-track">
  <div id="grxx">
    <el-card :body-style="{ padding: '0px' }">
        <img src="../../assets/index/index_grxx.jpg" class="image">
        <div style="padding: 14px;">
          <span>个人信息更改快速通道</span>
          <div class="bottom clearfix">
          <span class="time">这里是个人信息更改快速通道</span>
          <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoPersonal">进入</el-button>
          </div>
        </div>
      </el-card>
  </div>


  <div id="mhcx">
    <el-card :body-style="{ padding: '0px' }">
        <img src="../../assets/index/index_mhcc.jpg" class="image">
        <div style="padding: 14px;">
          <span>模糊查询预约快速通道</span>
          <div class="bottom clearfix">
            <span class="time">这里是模糊查询预约快速通道</span>
            <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoFuzzy">进入</el-button>
          </div>
        </div>
      </el-card>
  </div>

  <div id="jqcx">
    <el-card :body-style="{ padding: '0px' }">
        <img src="../../assets/index/index_jqcc.jpg" class="image">
        <div style="padding: 14px;">
          <span>精确查询预约快速通道</span>
          <div class="bottom clearfix">
            <span class="time">这里是精确查询预约快速通道</span>
            <el-button type="primary" round size="mini" style="margin-left:15px;float:right;" @click="gotoSearch">进入</el-button>
          </div>
        </div>
      </el-card>
  </div>
</div>

<template>
  <el-carousel indicator-position="outside" style="width:95%;">
    <el-carousel-item v-for="(val) in imgList" :key="val.index">
      <img v-bind:src="val.url" style="background-size:cover;">
    </el-carousel-item>
  </el-carousel>
</template>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      currentDate: new Date(),
      imgList:[
        {url:require('../../assets/index/mainPart_xtjj_1.jpg'),index:1},
        {url:require('../../assets/index/mainPart_xtjj_2.jpg'),index:2},
        {url:require('../../assets/index/mainPart_xtjj_3.jpg'),index:3}
      ]
    };
  },
  methods:{
    gotoPersonal() {
      this.$router.push('/home/personalMsg');
    },
    gotoFuzzy(){
      this.$router.push('/home/fuzzySearch');
    },
    gotoSearch(){
      this.$router.push('/home/searchReserve');
    }
  }
}
</script>

<style scoped>
  .phone-track{
    display: none;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  @media screen and (max-width: 767px) {
    .web-track{
      display: none;
    }
    .phone-track{
      display: block;
    }
    #mhcx{
      margin-top: 15px;
    }
    #jqcx{
      margin-top: 15px;
    }
    

  }
</style>
