<template>
    <el-container>
    <el-aside style="width:30%;height:500px;">
        <div class="btn-contain">
            <span class="chooseTitle">请选择增量备份频率</span>
            <div style="margin-top:60px;">
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="1" border>日备份</el-radio>
            </div>
            <div>
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="2" border>周备份</el-radio>
            </div>
            <div>
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="3" border>月备份</el-radio>
            </div>
        </div>
    </el-aside>
    <el-container>
    <el-main style="width:70%;height:500px;">
        <div class="time-contain">
            <div>
            <template>
                <span style="margin-right:30px;">日备份</span>
                <el-time-picker
                    v-model="value2"
                    :picker-options="{
                    selectableRange: '18:30:00 - 20:30:00'
                    }"
                    placeholder="任意时间点">
                </el-time-picker>
            </template>
            </div>

            <div style="margin-top:50px;">
            <template>
                <span style="margin-right:30px;">周备份</span>

                <el-dropdown>
                    <el-button type="primary">
                        请选择周几<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>周一</el-dropdown-item>
                        <el-dropdown-item>周二</el-dropdown-item>
                        <el-dropdown-item>周三</el-dropdown-item>
                        <el-dropdown-item>周四</el-dropdown-item>
                        <el-dropdown-item>周五</el-dropdown-item>
                        <el-dropdown-item>周六</el-dropdown-item>
                        <el-dropdown-item>周日</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-time-picker
                    v-model="value2"
                    :picker-options="{
                    selectableRange: '18:30:00 - 20:30:00'
                    }"
                    placeholder="任意时间点"
                    style="margin-left:10px;"
                    >
                </el-time-picker>
            </template>
            </div>

            <div style="margin-top:50px;">
            <template>
                <span style="margin-right:30px;float:left;">月备份</span>
                <template>
                    <div class="block">
                        <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="请选择您的月备份的日期和时间"
                        style="width:300px;">
                        </el-date-picker>
                    </div>
                </template>
            </template>
            </div>


        </div>
    </el-main>
    </el-container>
    </el-container>
</template>

<style>
    .btn-contain{
        background-color: white;
        border-radius: 30px;
        padding-left: 50px;
        padding-top: 90px;
        padding-bottom: 100px;
    }
    .chooseTitle{
        color: #409EFF;
        font-size: 20px;
        font-weight: bolder;
    }
    .time-contain{
        background-color: white;
        border-radius: 30px;
        padding-left: 50px;
        padding-top: 90px;
        padding-bottom: 100px;
    }
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>

<script>
export default {
    data () {
      return {
        value1: '',
        radio1: '1',
        value2: new Date(2016, 9, 10, 18, 40),
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    methods: {
      handleClick() {
        alert('button click');
      }
    }
}
</script>
