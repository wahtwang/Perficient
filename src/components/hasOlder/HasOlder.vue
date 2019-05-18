<template>
  <div>
    <p style="font-size:25px;margin-bottom:30px;">以下是您已预定的设备列表</p>
    <div class="list-group">
      <transition-group>
        <div :key="val.reservation.r_id" class="item" v-for="val in equipList">
          <div class="label">
            {{val.equipment.equip_name}}
            <span style="color:#ddd;">#{{val.equipment.equip_number}}</span>
          </div>
          <div class="item-main">
            <div class="attribute">
              <div class="key">型号</div>
              <div class="val">{{val.equipment.model}}</div>
            </div>
            <div class="attribute">
              <div class="key">类别</div>
              <div class="val">{{val.equipment.variety}}</div>
            </div>
            <div class="attribute">
              <div class="key">使用位置</div>
              <div class="val">{{val.equipment.location}}</div>
            </div>
            <div class="attribute">
              <div class="key">负责人</div>
              <div class="val">{{val.equipment.principal}}</div>
            </div>
            <div class="attribute">
              <div class="key">预定时间</div>
              <div class="val">{{val.reservation.r_date}}</div>
            </div>
            <div class="attribute">
              <div class="key">起始时间</div>
              <div class="val">{{val.reservation.r_starts}}</div>
            </div>
            <div class="attribute">
              <div class="key">结束时间</div>
              <div class="val">{{val.reservation.r_end}}</div>
            </div>
            <el-button @click="cancel(val)" size="small" style="float:left;margin:1.2% 1.2% 1.2% 16%;width:200px;" type="primary">取消预定</el-button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      var res = await this.$http.get('/user/getUserReservation')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.equipList = data
      }
    },
    cancel(val) {
      this.$confirm(
        `您将取消预约设备 ${val.equipment.equip_name}, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        var res = await this.$http.put('/user/deleteOrder', {
          r_id: val.reservation.r_id,
          equip_id: val.equipment.equip_id
        })
        const { data, meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: '取消预约成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        } else {
          this.$message({
            message: meta.message,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  },
  data() {
    return {
      equipList: []
    }
  }
}
</script>
<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: 0.5s all;
}
.v-leave-active {
  position: absolute;
}
.v-move {
  transition: 0.3s all;
}
.attribute {
  background-color: #fafafa;
  float: left;
  margin: 1%;
  padding: 10px 20px;
  border-radius: 5px;
}
.attribute div {
  float: left;
}
.key {
  color: #409eff;
}
.val {
  margin-left: 20px;
}
.item {
  overflow: hidden;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px #eee;
  padding: 10px;
}
.label {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>