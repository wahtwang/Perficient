<template>
  <div class="container fuzzySearch">
    <div style="text-align:center;">
      <el-input class="search-input" placeholder="输入相关设备信息" prefix-icon="el-icon-search" size="mini" v-model="searchStr"></el-input>
    </div>
    <el-main class="pc" style="padding:0;box-shadow: 0 0 10px #eee;border-radius:10px;">
      <el-pagination
        :current-page.sync="curPage"
        :page-size="pageSize"
        :total="total"
        @current-change="getCurPageList"
        layout="total, prev, pager, next,jumper"
        style="background-color:#fff;text-align:center;padding:20px 0 10px 0;"
      ></el-pagination>
      <el-table :data="tableData" :row-class-name="tableRowClassName" row-key="id" style="width: 100%;padding: 0 0 10px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.isFree">
              <el-row style="margin-left:5px;color:#ccc;font-size:20px;cursor:unset;">
                <el-col :span="24">该设备当前时间未被使用</el-col>
              </el-row>
            </div>
            <div v-if="!props.row.isFree">
              <el-row style="margin-left:5px;color:#E6A23C;font-size:20px;padding-bottom:10px;">
                <el-col>该设备这段时间在以下项目中使用：</el-col>
              </el-row>
              <el-row
                :key="val.id"
                style="background-color: #fafafa;margin-right:5%;margin-top:10px;padding: 10px 0;border-radius:10px;"
                v-for="val in props.row.curProjects"
              >
                <el-col :span="1" style="text-align:center;vertical-align:middle;">
                  <i class="el-icon-info" style="vertical-align:middle;color:#aaa;"></i>
                </el-col>
                <el-col :span="5" style="vertical-align:middle;text-align:center;">
                  <span style="color:#aaa;margin-right:15px;vertical-align:middle;">项目名</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{val.curProjectName}}</span>
                </el-col>
                <el-col :span="13" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">持续时间</span>
                  <span
                    style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;"
                  >{{val.curProjectStartTime}} —— {{val.curProjectEndTime}}</span>
                </el-col>
                <el-col :span="5" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">预定人</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{val.orderPerson}}</span>
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
        <el-table-column label="当前使用情况" min-width="50" prop="isfree">
          <template slot-scope="props">
            <span v-if="!props.row.state">{{props.row.state | filterIsFree(isFreeStyle,props.row)}}</span>
            <span style="color: #67C23A" v-else-if="props.row.isFree">{{props.row.state | filterIsFree(isFreeStyle,props.row)}}</span>
            <span style="color:red;" v-else>{{props.row.state | filterIsFree(isFreeStyle,props.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-button disabled size="mini" type="primary" v-if="!props.row.state">不可预定</el-button>
            <el-button @click="toOrder(props.row.id)" size="mini" type="primary" v-if="props.row.state">点击预定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      :current-page.sync="curPage"
      :page-size="pageSize"
      :total="total"
      @current-change="getCurPageList"
      class="mobilePage"
      layout=" prev, pager, next"
      small
      style="text-align:center;border-radius:5px;"
    ></el-pagination>
    <div :key="val.id" class="mobile" v-for="(val,index) in tableData">
      <label style="border-bottom:1px solid #eee;display:block;padding-bottom:4%;">
        <span style="color:#409eff;font-weight:1000;">{{val.equip_name}}</span>
        <span style="color:#ccc;font-size: 12px;vertical-align:bottom;margin-left:2px;">{{val.model}}</span>
        <span style="color:#e2e2e2;position:absolute;top:1%;right:1%;">#{{index+1}}</span>
        <span style="float:right;font-size: 14px;color: #999;line-height:20px;display:inline-block;height:20px;">
          <span v-if="!val.state">{{val.state | filterIsFree(isFreeStyle,val)}}</span>
          <span style="color: #67C23A" v-else-if="val.isFree">{{val.state | filterIsFree(isFreeStyle,val)}}</span>
          <span style="color:red;" v-else>{{val.state | filterIsFree(isFreeStyle,val)}}</span>
        </span>
      </label>
      <main>
        <div class="mobileFuzzy">
          <el-form class="demo-table-expand" inline label-position="left" style="text-align:center;">
            <el-form-item label="类别">
              <span>{{val.class}}</span>
            </el-form-item>
            <el-form-item label="使用位置">
              <span>{{val.location}}</span>
            </el-form-item>
            <el-form-item label="负责人">
              <span>{{val.add_user_name}}</span>
            </el-form-item>
          </el-form>
        </div>
        <el-collapse v-if="val.state">
          <el-collapse-item style="color: #999;" title="当前使用详情">
            <div>
              <p style="color:#E6A23C;font-size:14px;">该设备正在以下项目中使用：</p>
              <div :key="val.id" style="margin-bottom: 20px" v-for="val in val.curProjects">
                <div :key="index" class="mobileFuzzy mobile-expend">
                  <el-form
                    class="demo-table-expand"
                    inline
                    label-position="left"
                    style="text-align:center;background-color:#fafafa;border-radius:5px;padding-top:0px;padding-bottom:0px;"
                  >
                    <el-form-item label="类别">
                      <span style="color:#409eff">{{val.curProjectName}}</span>
                    </el-form-item>
                    <el-form-item label="持续时间">
                      <span style="color:#409eff">{{val.curProjectStartTime}}</span>
                    </el-form-item>
                    <el-form-item label="至">
                      <span style="color:#409eff">{{val.curProjectEndTime}}</span>
                    </el-form-item>
                    <el-form-item label="预约人">
                      <span style="color:#409eff">{{val.orderPerson}}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-button size="mini" style="padding:5px 5px;margin-top:3%;display:block;width:100%;" type="primary" v-if="val.state">预定</el-button>
        <el-button disabled size="mini" style="padding:5px 5px;margin-top:3%;display:block;width:100%;" type="primary" v-if="!val.state">不可预定</el-button>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      isFreeStyle: {},
      total: 150,
      curPage: 1,
      pageSize: 10,
      tableData: [
        {
          id: '1',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '2',
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
          orderPerson: '',
          curProjects: []
        },
        {
          id: '3',
          equip_name: '血液细胞分析仪',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第三医务室',
          add_user_name: '王强',
          state: false,
          isFree: true,
          curProjects: []
        },
        {
          id: '4',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '5',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '6',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '7',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '8',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '9',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        },
        {
          id: '10',
          equip_name: '颈椎腰椎牵引器',
          model: 'SM-9500',
          class: '医疗康复设备',
          location: '第二实验室',
          add_user_name: '王强',
          state: true,
          isFree: false,
          curProjects: [
            {
              id: 1,
              curProjectName: '数字化技术测试',
              curProjectStartTime: '1999-08-28 08:00',
              curProjectEndTime: '2019-05-28 08:00',
              orderPerson: '王煜辉'
            }
          ]
        }
      ]
    }
  },
  filters: {
    filterIsFree(state, isFreeStyle, row) {
      if (state === false) {
        isFreeStyle = {
          color: '#666'
        }
        return '被禁用'
      } else if (row.isFree === false) {
        isFreeStyle = {
          color: 'red'
        }
        return '使用中'
      } else {
        isFreeStyle = {
          color: 'red'
        }
        return '空闲'
      }
    }
  },
  methods: {
    getCurPageList() {
      console.log(`从服务端拿到第${this.curPage}页面的数据`)
      // let curPage = this.curPage
      // this.getUserList(curPage)
    },
    async getList(page = 1) {
      var res = await this.$http.get('/searchEquip', {
        params: {
          searchStr: this.searchStr || '',
          pagenum: page,
          pagesize: this.pageSize
        }
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
        this.total = data.total
        // 有时修改数据后要往后退一页，或者到最后一夜，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
        this.curPage = page
      }
    },
    toOrder(id) {
      this.$router.push('/home/order?id=' + id)
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
        console.log(
          `从服务端拿到第==1==页面的=${this.$store.state.fuzzySearchStr}===数据`
        )
        //this.getList()
        return this.$store.state.fuzzySearchStr
      },
      set: function(val) {
        //this.getList()

        this.$store.state.fuzzySearchStr = val
      }
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.search-input {
  width: 70%;
  margin-bottom: 2%;
  box-shadow: 0 0 10px #eee;
  display: none;
  transition: border 0.3s;
}
.mobile {
  vertical-align: top;
  position: relative;
  text-align: left;
  padding: 3%;
  padding-top: 25px;
  padding-bottom: 2%;
  box-sizing: border-box;
  box-shadow: 0 0 10px #eee;
  border-radius: 5px;
  margin: 2%;
  width: 46%;
  overflow: hidden;
  background-color: #fff;
  display: none;
}
.mobilePage {
  display: none;
}
@media screen and (max-width: 767px) {
  .mobilePage {
    display: block;
  }
  .pc {
    display: none;
  }
  .mobile {
    display: inline-block;
  }
  .search-input {
    display: inline-table;
  }
  .container {
    margin-top: 0;
  }
}
@media screen and (max-width: 562px) {
  .mobile {
    width: 96%;
  }
}
</style>
