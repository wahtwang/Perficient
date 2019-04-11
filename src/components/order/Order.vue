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
          <span class="val">{{tableData.class}}</span>
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
          <span class="val">{{tableData.add_user_name}}</span>
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
      <div :key="index" class="project-item-group" v-for="(val,index) in tableData.curProjects">
        <p class="key">{{index+1}}</p>
        <div>
          <div class="project-item">
            <span class="project-key">项目名：</span>
            <span class="project-val">{{val.curProjectName}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">时间段：</span>
            <span class="project-val">{{val.curProjectStartTime}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">至：</span>
            <span class="project-val">{{val.curProjectEndTime}}</span>
          </div>
          <div class="project-item">
            <span class="project-key">预约人：</span>
            <span class="project-val">{{val.orderPerson}}</span>
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
    state(row) {
      if (row.state) {
        if (row.isFree) {
          return '空闲'
        } else {
          return '使用中'
        }
      } else {
        return '被禁用'
      }
    },
    state2(row) {
      if (row.state) {
        if (row.isFree) {
          return '设备现阶段空闲'
        } else {
          return '设备正（将）在以下项目中使用'
        }
      } else {
        return '设备已被禁用'
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
      tableData: {
        id: '1',
        equip_name: '颈椎腰椎牵引器',
        model: 'SM-9500',
        class: '医疗康复设备',
        location: '第二实验室',
        add_user_name: '王强',
        brand: '耐克牌设备',
        state: true,
        isFree: false,
        curProjects: [
          {
            id: 1,
            curProjectName: '数字化技术测试',
            curProjectStartTime: '1999-08-28 08:00',
            curProjectEndTime: '2019-05-28 08:00',
            orderPerson: '王煜辉'
          },
          {
            id: 2,
            curProjectName: '数字化技术测试',
            curProjectStartTime: '1999-08-28 08:00',
            curProjectEndTime: '2019-05-28 08:00',
            orderPerson: '王泽烽'
          },
          {
            id: 3,
            curProjectName: '数字化技术测试',
            curProjectStartTime: '1999-08-28 08:00',
            curProjectEndTime: '2019-05-28 08:00',
            orderPerson: '寝室长'
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
