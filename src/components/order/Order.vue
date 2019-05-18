<template>
  <div class="container">
    <div class="equipment-main">
      <div class="title-name">
        <span v-text="equip.equip_name"></span>
      </div>
      <div class="item-group">
        <div class="item">
          <span class="key">型号:</span>
          <span class="val">{{equip.model}}</span>
        </div>
        <div class="item">
          <span class="key">类型:</span>
          <span class="val">{{equip.variety}}</span>
        </div>
        <div class="item">
          <span class="key">品牌:</span>
          <span class="val">{{equip.brand}}</span>
        </div>
        <div class="item">
          <span class="key">所在位置:</span>
          <span class="val">{{equip.location}}</span>
        </div>
        <div class="item">
          <span class="key">负责人:</span>
          <span class="val">{{equip.principal}}</span>
        </div>
        <div class="item">
          <span class="key">状态:</span>
          <span class="val">{{equip|state}}</span>
        </div>
      </div>
    </div>
    <div class="older-container">
      <div class="title-name">
        <span>请您选择项目及合适的预约时间</span>
      </div>
      <el-date-picker
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="开始日期"
        style="width:100%;margin-top:40px;"
        type="datetimerange"
        v-model="dateArrText"
        value-format="yyyy-MM-dd HH:mm"
      ></el-date-picker>
      <el-select
        @change="selectChange"
        clearable
        filterable
        placeholder="请选择需要预定设备的项目"
        style="width:100%;margin-top:40px;"
        v-model="select"
        value-key="project_id"
      >
        <el-option :key="item.project_id" :label="item.project_name" :value="item" v-for="item in project">
          <span style="float: left">{{ item.project_name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.project_number }}</span>
        </el-option>
      </el-select>
      <el-button @click="submit" style="width: 100%; margin-top:40px;" type="primary">立即预约</el-button>
    </div>
    <div class="beOlder">
      <div class="title-name">
        <span>{{equip|state2}}</span>
      </div>
      <div :key="index" class="project-item-group" v-for="(val,index) in equip.reseverInfos">
        <p class="key">#{{index+1}}</p>
        <div>
          <div class="project-item">
            <span class="project-key">项目名：</span>
            <span class="project-val">{{val.project_name}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">时间段：</span>
            <span class="project-val">{{val.r_starts}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">至：</span>
            <span class="project-val">{{val.r_end}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">预约人：</span>
            <span class="project-val">{{val.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { constants } from 'crypto'
export default {
  async created() {
    var res = await this.$http.get('/user/getRunningProjects')
    if (res.data.meta.status === 200) {
      this.project = res.data.data.project
      this.order.equip_id = this.equip.equip_id
    }
    this.getEuiMsg()
  },
  filters: {
    state(a) {
      if (a.state) {
        if (a.state === 0) {
          return '报废'
        } else if (a.state === 2) {
          return '维修'
        } else if (a.state === 3) {
          return '停用'
        } else {
          if (a.free) {
            return '未被使用'
          } else {
            return '正在使用'
          }
        }
      }
    },
    state2(a) {
      if (a.state) {
        if (a.state === 0) {
          return '该设备已报废'
        } else if (a.state === 2) {
          return '该设备正在维修中'
        } else if (a.state === 3) {
          return '该设备已被停用'
        } else {
          if (a.reseverInfos == 0) {
            return '设备现阶段空闲'
          } else {
            return '设备正（将）在以下项目中使用'
          }
        }
      }
    }
  },
  methods: {
    async getEuiMsg() {
      let search = {
        r_starts: '1970-05-05 08:29:00',
        r_end: '2050-05-05 08:29:00',
        equip_number: this.equip.equip_number,
        model: '',
        equip_name: '',
        location: '',
        principal: '',
        page: 1,
        size: 1
      }
      var res = await this.$http.get('/user/searchEquipAccurate', {
        params: search
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
        this.equip = data.equipment[0]
      }
    },
    selectChange(row) {
      this.order.project_id = row.project_id
    },
    async submit() {
      this.order.r_starts = this.dateArrText[0] + ':00'
      this.order.r_end = this.dateArrText[1] + ':00'
      var res = await this.$http.post('/user/orderEquip', this.order)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '预定成功',
          type: 'success',
          duration: 1000
        })
        this.getEuiMsg()
      }
    },
    date(i = 0, half = 0) {
      let now = new Date()
      now.setDate(now.getDate() + i)
      now.setMinutes(now.getMinutes() + half)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      now = `${year}-${month
        .toString()
        .padStart(2, 0)}-${day
        .toString()
        .padStart(2, 0)} ${hour
        .toString()
        .padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`
      return now
    }
  },
  data() {
    return {
      dateArrText: [this.date(0, 5), this.date(1, 5)],
      order: {
        r_starts: '',
        r_end: '',
        project_id: '',
        equip_id: '',
        user_id: localStorage.getItem('user_id')
      },
      freeStyle: {},
      components: {},
      project: [],
      select: '',
      equip: this.$store.state.equip
    }
  }
}
</script>

<style scoped src="./order.css">
</style>
