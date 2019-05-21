<template>
  <div class="container fuzzySearch">
    <div style="text-align:center;">
      <el-input class="search-input" placeholder="输入相关设备信息" prefix-icon="el-icon-search" size="mini" v-model="equip"></el-input>
    </div>
    <el-main class="pc" style="padding:0;box-shadow: 0 0 10px #eee;border-radius:10px;">
      <el-pagination
        :current-page.sync="endChangePage"
        :page-count="pageCount"
        :page-size="size"
        @current-change="getendChangePageList(endChangePage)"
        layout="total, prev, pager, next,jumper"
        style="background-color:#fff;text-align:center;padding:20px 0 10px 0;"
      ></el-pagination>
      <el-table :data="equipment" :row-class-name="tableRowClassName" row-key="equip_id" style="width: 100%;padding: 0 0 10px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.reseverInfos === null">
              <el-row style="margin-left:5px;color:#ccc;font-size:20px;cursor:unset;">
                <el-col :span="24">该设备进段时间未被预约</el-col>
              </el-row>
            </div>
            <div v-if="props.row.reseverInfos !== null">
              <el-row style="margin-left:5px;color:#E6A23C;font-size:20px;padding-bottom:10px;">
                <el-col>该设备被以下项目预约：</el-col>
              </el-row>
              <el-row
                :key="val.r_id"
                style="background-color: #fafafa;margin-right:5%;margin-top:10px;padding: 10px 0;border-radius:10px;"
                v-for="val in props.row.reseverInfos"
              >
                <el-col :span="1" style="text-align:center;vertical-align:middle;">
                  <i class="el-icon-info" style="vertical-align:middle;color:#aaa;"></i>
                </el-col>
                <el-col :span="6" style="vertical-align:middle;text-align:center;">
                  <span style="color:#aaa;margin-right:15px;vertical-align:middle;">项目名</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{val.project_name}}</span>
                </el-col>
                <el-col :span="12" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">持续时间</span>
                  <span
                    style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;"
                  >{{val.r_starts}} —— {{val.r_end}}</span>
                </el-col>
                <el-col :span="5" style="vertical-align:middle;text-align:center;">
                  <span style="font-size:14px;color:#aaa;margin-right:20px;vertical-align:middle;">预定人</span>
                  <span style="font-weight:1000;color:#409eff;font-size:17px;vertical-align:middle;display:inline-block;">{{val.name}}</span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="编号" min-width="50" prop="equip_number"></el-table-column>
        <el-table-column label="设备名" min-width="50" prop="equip_name"></el-table-column>
        <el-table-column label="型号" min-width="50" prop="model"></el-table-column>
        <el-table-column label="类别" min-width="50" prop="variety"></el-table-column>
        <el-table-column label="使用位置" min-width="50" prop="location"></el-table-column>
        <el-table-column label="设备负责人" min-width="50" prop="principal"></el-table-column>
        <el-table-column label="当前使用情况" min-width="50" prop="free">
          <template slot-scope="props">
            <span v-if="!props.row.state">{{props.row.state | filterfree(freeStyle,props.row)}}</span>
            <span style="color: #67C23A" v-else-if="props.row.free">{{props.row.state | filterfree(freeStyle,props.row)}}</span>
            <span style="color:red;" v-else>{{props.row.state | filterfree(freeStyle,props.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-button disabled size="mini" type="primary" v-if="props.row.state !== 1">不可预定</el-button>
            <el-button @click="toOrder(props.row)" size="mini" type="primary" v-if="props.row.state === 1">点击预定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      :current-page.sync="endChangePage"
      :page-count="pageCount"
      :page-size="size"
      @current-change="getendChangePageList"
      class="mobilePage"
      layout=" prev, pager, next"
      small
      style="text-align:center;border-radius:5px;"
    ></el-pagination>
    <div :key="val.r_id" class="mobile" v-for="(val,index) in equipment">
      <label style="border-bottom:1px solid #eee;display:block;padding-bottom:4%;">
        <span style="color:#409eff;font-weight:1000;">{{val.equip_name}}</span>
        <span style="color:#ccc;font-size: 12px;vertical-align:bottom;margin-left:2px;">{{val.model}}</span>
        <span style="color:#e2e2e2;position:absolute;top:1%;right:1%;">#{{val.equip_number}}</span>
        <span style="float:right;font-size: 14px;color: #999;line-height:20px;display:inline-block;height:20px;">
          <span v-if="!val.state">{{val.state | filterfree(freeStyle,val)}}</span>
          <span style="color: #67C23A" v-else-if="val.free">{{val.state | filterfree(freeStyle,val)}}</span>
          <span style="color:red;" v-else>{{val.state | filterfree(freeStyle,val)}}</span>
        </span>
      </label>
      <main>
        <div class="mobileFuzzy">
          <el-form class="demo-table-expand" inline label-position="left" style="text-align:center;">
            <el-form-item label="类别">
              <span>{{val.variety}}</span>
            </el-form-item>
            <el-form-item label="使用位置">
              <span>{{val.location}}</span>
            </el-form-item>
            <el-form-item label="负责人">
              <span>{{val.principal}}</span>
            </el-form-item>
          </el-form>
        </div>
        <el-collapse v-if="val.reseverInfos === null">
          <span style="font-size:12px;color:green;">该设备近段时间未被预约</span>
        </el-collapse>
        <el-collapse v-if="val.state&&val.reseverInfos !== null">
          <el-collapse-item style="color: #999;" title="当前使用详情">
            <div>
              <p style="color:#E6A23C;font-size:14px;">该设备被以下项目预约：</p>
              <div :key="val.id" style="margin-bottom: 20px" v-for="val in val.reseverInfos">
                <div :key="index" class="mobileFuzzy mobile-expend">
                  <el-form
                    class="demo-table-expand"
                    inline
                    label-position="left"
                    style="text-align:center;background-color:#fafafa;border-radius:5px;padding-top:0px;padding-bottom:0px;"
                  >
                    <el-form-item label="类别">
                      <span style="color:#409eff">{{val.project_name}}</span>
                    </el-form-item>
                    <el-form-item label="持续时间">
                      <span style="color:#409eff">{{val.r_starts}}</span>
                    </el-form-item>
                    <el-form-item label="至">
                      <span style="color:#409eff">{{val.r_end}}</span>
                    </el-form-item>
                    <el-form-item label="预约人">
                      <span style="color:#409eff">{{val.name}}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-button
          @click="toOrder(val)"
          size="mini"
          style="padding:5px 5px;margin-top:3%;display:block;width:100%;"
          type="primary"
          v-if="val.state"
        >预定</el-button>
        <el-button disabled size="mini" style="padding:5px 5px;margin-top:3%;display:block;width:100%;" type="primary" v-if="!val.state">不可预定</el-button>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { constants } from 'crypto'
import { watch } from 'fs'
export default {
  created() {
    this.getendChangePageList()
  },
  data() {
    return {
      freeStyle: {},
      pageCount: 1,
      endChangePage: 1,
      size: 10,
      equipment: []
    }
  },
  filters: {
    filterfree(state, freeStyle, row) {
      if (state === 0) {
        freeStyle = {
          color: 'red'
        }
        return '报废'
      } else if (state === 2) {
        freeStyle = {
          color: 'red'
        }
        return '维修'
      } else if (state === 3) {
        freeStyle = {
          color: 'red'
        }
        return '停用'
      } else {
        if (row.free) {
          freeStyle = {
            color: '#666'
          }
          return '未被使用'
        } else {
          freeStyle = {
            color: '#666'
          }
          return '正在使用'
        }
      }
    }
  },
  methods: {
    async getendChangePageList(page = 1) {
      var res = await this.$http.get('/user/searchEquip', {
        params: {
          equip: this.$store.state.fuzzyEquip || '',
          page: page,
          size: this.size
        }
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        for (let i in data.equipment) {
          if (data.equipment[i].reseverInfos) {
            data.equipment[i].reseverInfos.map(val => {
              val.r_starts = val.r_starts.slice(0, val.r_starts.length - 3)
              val.r_end = val.r_end.slice(0, val.r_end.length - 3)
              return val
            })
          }
        }
        this.equipment = data.equipment
        this.pageCount = data.totalPage
        // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
        this.endChangePage = page
      } else {
        this.equipment = []
        this.pageCount = 1
      }
    },
    toOrder(row) {
      this.$store.state.equip = row
      this.$router.push('/home/order')
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state !== 1) {
        return 'warning-row'
      }
      return ''
    }
  },
  computed: {
    equip: {
      get: function() {
        this.getendChangePageList()
        return this.$store.state.fuzzyEquip
      },
      set: function(val) {
        this.$store.state.fuzzyEquip = val
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
