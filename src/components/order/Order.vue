<template>
  <div class="container">
    <div class="equipment-main">
      <div class="title-name">
        <span v-text="tableData.equip_name"></span>
      </div>
      <div class="item-group">
        <div class="item">
          <span class="key">型号:</span>
          <span class="val">{{tableData.model}}</span>
        </div>
        <div class="item">
          <span class="key">类型:</span>
          <span class="val">{{tableData.variety}}</span>
        </div>
        <div class="item">
          <span class="key">品牌:</span>
          <span class="val">{{tableData.brand}}</span>
        </div>
        <div class="item">
          <span class="key">所在位置:</span>
          <span class="val">{{tableData.location}}</span>
        </div>
        <div class="item">
          <span class="key">负责人:</span>
          <span class="val">{{tableData.principal}}</span>
        </div>
        <div class="item">
          <span class="key">状态:</span>
          <span class="val">{{tableData|state}}</span>
        </div>
      </div>
    </div>
    <div class="older-container">
      <div class="title-name">
        <span>请您选择合适的预约时间</span>
      </div>
      <el-date-picker
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="开始日期"
        style="width:100%;margin-top:40px;"
        type="datetimerange"
        v-model="dateArrText"
        value-format="yyyy/MM/dd HH:mm"
      ></el-date-picker>
      <el-button style="width: 100%; margin-top:40px;" type="primary">立即预约</el-button>
    </div>
    <div class="beOlder">
      <div class="title-name">
        <span>{{tableData|state2}}</span>
      </div>
      <div :key="index" class="project-item-group" v-for="(val,index) in tableData.reseverInfos">
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
  filters: {
    state(tableData) {
      if (tableData.state) {
        if (tableData.state === 0) {
          return '报废'
        } else if (tableData.state === 2) {
          return '维修'
        } else if (tableData.state === 3) {
          return '停用'
        } else {
          if (tableData.free) {
            return '未被使用'
          } else {
            return '正在使用'
          }
        }
      }
    },
    state2(tableData) {
      if (tableData.state) {
        if (tableData.state === 0) {
          return '该设备已报废'
        } else if (tableData.state === 2) {
          return '该设备正在维修中'
        } else if (tableData.state === 3) {
          return '该设备已被停用'
        } else {
          if (tableData.reseverInfos == 0) {
            return '设备现阶段空闲'
          } else {
            return '设备正（将）在以下项目中使用'
          }
        }
      }
    }
  },
  methods: {
    date(i = 0, half = 0) {
      let now = new Date()
      now.setDate(now.getDate() + i)
      now.setMinutes(now.getMinutes() + half)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      now = `${year}/${month
        .toString()
        .padStart(2, 0)}/${day
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
        startTime: '',
        endTime: ''
      },
      freeStyle: {},
      tableData: {
        id: '1',
        equip_name: '颈椎腰椎牵引器',
        model: 'SM-9500',
        variety: '医疗康复设备',
        location: '第二实验室',
        principal: '王强',
        brand: '耐克牌设备',
        state: true,
        free: false,
        reseverInfos: [
          {
            r_id: 1,
            project_name: '数字化技术测试',
            r_starts: '1999-08-28 08:00',
            r_end: '2019-05-28 08:00',
            name: '王煜辉'
          }
        ]
      }
    }
  },
  components: {}
}
</script>

<style scoped src="./order.css">
</style>
