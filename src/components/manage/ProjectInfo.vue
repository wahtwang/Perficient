<template>
<div class="main-content" style="width:100%;">
  <!-- <div class="filter-condition">
    <el-row>
      <el-col :span="20">
        <div class="condition-tags">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable"
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="condition-date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="selectDate"
            style="width: 100%;">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
  </div> -->
  <div class="report-cards">
    <el-row>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>大型项目1（新型制药实验）</span>
            <el-switch
          v-model="isTrue"
          @click="handleSwitch"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>小型项目1(基于阿尔贝产品的研发)</span>
            <el-switch
          v-model="isTrue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 20" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>中小型项目（药物发展研究）</span>
            <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 3" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>大型项目2（第二代新型制药实验）</span>
            <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 5" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>小型项目1(3号药物检测)</span>
            <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 2" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>中小型项目2（新型药物考量标准）</span>
            <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float: right;">
        </el-switch>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'使用设备名 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
        value1: true,
        value2: false,
        isTrue: true,

        // tags: [
        //     { name: '全国', type: '', closable: false},
        //     { name: '大东南区', type: '', closable: true },
        //     { name: '全车系', type: 'success', closable: false },
        //     { name: '新明锐', type: 'success', closable: true },
        //     { name: '全渠道', type: 'warning', closable: false },
        //     { name: 'DCC', type: 'warning', closable: true },
        // ],
        // selectDate: new Date()
        }
    },
    methods: {
        onSubmit() {
        this.$message('submit!')
        },
        handleSwitch(){
          if(this.isTrue === true){
            this.isTrue = false;

          }else{
            this.isTrue = true;
          }
        }
    }
    }
</script>
<style>
  .el-card__header {
    padding: 5px 10px;
    background: #D9D9D9;
  }
  .el-card__body {

    height: 80%;
    overflow-y: auto;

  }
</style>
<style  scoped>
.filter-condition {
  background: #464B5D;

}
.el-tag {
  margin-right: 10px;
}
.el-card {
  background: #F2F2F2;

  margin: 5px 2px 2px 2px;
  height: 37vh;
}
</style>