<template>
  <div class="container">
    <div style="text-align:center;">
      <el-input class="search-input" placeholder="输入相关设备信息" prefix-icon="el-icon-search" size="mini" v-model="searchStr"></el-input>
    </div>
    <el-main style="padding:0;box-shadow: 0 0 10px #eee;border-radius:10px;">
      <el-pagination
        :page-count="10"
        :total="30"
        layout="total, prev, pager, next,jumper"
        style="background-color:#fff;text-align:center;padding:20px 0 10px 0;"
      ></el-pagination>
      <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%;padding: 0 0 10px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.isFree">
              <el-row style="margin-left:5px;color:#ccc;font-size:20px;cursor:unset;">
                <el-col :span="24">该设备当前时间未被使用</el-col>
              </el-row>
            </div>
            <div v-if="!props.row.isFree">
              <el-row style="margin-left:5px;color:#E6A23C;font-size:20px;padding-bottom:20px;">
                <el-col>该设备正在以下项目中使用：</el-col>
              </el-row>
              <el-row style="background-color: #fafafa;margin-right:5%;padding: 10px 0;border-radius:10px;">
                <el-col :span="7" style="vertical-align:middle;text-align:center;">
                  <span style="color:#aaa;margin-right:15px;vertical-align:middle;">项目名</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{props.row.curProjectName}}</span>
                </el-col>
                <el-col :span="12" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">持续时间</span>
                  <span
                    style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;"
                  >{{props.row.curProjectStartTime}} —— {{props.row.curProjectEndTime}}</span>
                </el-col>
                <el-col :span="5" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">预定人</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{props.row.orderPerson}}</span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="20" type="index"></el-table-column>
        <el-table-column label="设备名" prop="equip_name"></el-table-column>
        <el-table-column label="型号" prop="model"></el-table-column>
        <el-table-column label="类别" min-width="50" prop="class"></el-table-column>
        <el-table-column label="使用位置" min-width="50" prop="location"></el-table-column>
        <el-table-column label="设备负责人" min-width="50" prop="add_user_name"></el-table-column>
        <el-table-column :formatter="filterIsfree" label="当前使用情况" min-width="50" prop="isfree"></el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-button disabled size="mini" type="primary" v-if="!props.row.state">不可预定</el-button>
            <el-button size="mini" type="primary" v-if="props.row.state">点击预定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjectName: '数字化技术测试',
          curProjectStartTime: '1999-08-28 08:00',
          curProjectEndTime: '2019-05-28 08:00',
          orderPerson: '王煜辉'
        },
        {
          equip_name: '外伤处置车',
          model: 'SM-9500',
          class: '常用医疗器械',
          location: '楼顶',
          add_user_name: '十天籁',
          state: true,
          isFree: true,
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '血液细胞分析仪',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第三医务室',
          add_user_name: '王强',
          state: false,
          isFree: true,
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        },
        {
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          project_name: '数字化技术测试',
          add_user_name: '王强',
          state: '正在使用',
          curProjectName: '',
          curProjectStartTime: '',
          curProjectEndTime: '',
          orderPerson: ''
        }
      ]
    }
  },
  methods: {
    filterIsfree(row, column, cellValue, index) {
      if (row.state === false) {
        return '被禁用'
      } else if (row.isFree === false) {
        return '使用中'
      } else {
        return '空闲'
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state === false) {
        return 'warning-row'
      }
      return ''
    }
  },
  computed: {
    searchStr: {
      get: function() {
        return this.$store.state.fuzzySearchStr
      },
      set: function(val) {
        this.$store.state.fuzzySearchStr = val
      }
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 70%;
  margin-bottom: 2%;
  box-shadow: 0 0 10px #eee;
  display: none;
  transition: border 0.3s;
}

@media screen and (max-width: 767px) {
  .search-input {
    display: inline-table;
  }
  .container {
    margin-top: 0;
  }
}
</style>
