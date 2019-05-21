<template>
    <el-container>
    <el-aside style="width:30%;height:500px;">
        <div class="btn-contain">
            <span class="chooseTitle">请选择增量备份频率</span>
            <div style="margin-top:60px;">
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="0" border>日备份</el-radio>
            </div>
            <div>
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="1" border>周备份</el-radio>
            </div>
            <div>
                <el-radio style="margin-bottom:30px;width:120px;" 
                v-model="radio1" label="2" border>月备份</el-radio>
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

                <el-select  placeholder="请选择星期几" v-model="week">
                    <el-option label="周一" value="1"></el-option>
                    <el-option label="周二" value="2"></el-option>
                    <el-option label="周三" value="3"></el-option>
                    <el-option label="周四" value="4"></el-option>
                    <el-option label="周五" value="5"></el-option>
                    <el-option label="周六" value="6"></el-option>
                    <el-option label="周日" value="7"></el-option>
                </el-select>

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
                        <!-- <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="请选择您的月备份的日期和时间"
                        style="width:300px;">
                        </el-date-picker> -->
                        <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="28"></el-input-number>
                        <el-time-picker
                        v-model="value2"
                        :picker-options="{
                        selectableRange: '18:30:00 - 20:30:00'
                        }"
                        placeholder="任意时间点"
                        style="margin-left:10px;"
                        >
                        </el-time-picker>
                        <span style="font-size:10px;color:#787878">（选择该月的某号和时间）</span>
                    </div>
                </template>
            </template>
            </div>

            <div style="padding-top:50px;text-align:center">
                <el-button type="primary" round @click="startBackup">点击此处，开启我的增量备份<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>


        </div>
    </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
      return {
        num8: 1,
        week:'',
        value1: '',
        radio1: '0',
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
      },
      handleChange(value) {
        console.log(value);
      },
      startBackup(){
          if(this.radio1 === '0'){
              this.$message({
                showClose: true,
                message: '设置  日备份  增量备份成功',
                type: 'success'
                });
          }else if(this.radio1 === '1'){
              this.$message({
                showClose: true,
                message: '设置  周备份  增量备份成功',
                type: 'success'
                });

          }else if(this.radio1 === '2'){
              this.$message({
                showClose: true,
                message: '设置  月备份  增量备份成功',
                type: 'success'
                });
              
          }
      }
    }
}
</script>

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
