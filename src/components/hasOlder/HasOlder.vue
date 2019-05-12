<template>
  <div>
    <p style="font-size:25px;margin-bottom:30px;">以下是您已预定的设备列表</p>
    <div class="list-group">
      <div :key="val.equip_id" class="item" v-for="val in equipList">
        <div class="label">
          {{val.equip_name}}
          <span style="color:#ddd;">#{{val.equip_number}}</span>
        </div>
        <div class="item-main">
          <div class="attribute">
            <div class="key">型号</div>
            <div class="val">{{val.model}}</div>
          </div>
          <div class="attribute">
            <div class="key">类别</div>
            <div class="val">{{val.variety}}</div>
          </div>
          <div class="attribute">
            <div class="key">使用位置</div>
            <div class="val">{{val.location}}</div>
          </div>
          <div class="attribute">
            <div class="key">负责人</div>
            <div class="val">{{val.principal}}</div>
          </div>
          <div class="attribute">
            <div class="key">预定时间</div>
            <div class="val">{{val.equip_name}}</div>
          </div>
          <el-button size="small" style="float:left;margin:2.2%;" type="primary">取消预定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async getList() {
      this.search.page = page
      this.search.size = this.size
      this.search.r_starts.end
      var res = await this.$http.get('/user/searchEquipAccurate', {
        params: this.search
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
    }
  },
  data() {
    return {
      // search: {
      //   r_starts: this.date(),
      //   r_end: this.date(1),
      //   equip_number: '',
      //   model: '',
      //   equip_name: '',
      //   location: '',
      //   principal: ''
      // },
      equipList: [
        {
          equip_id: 1,
          equip_number: 12,
          equip_name: '巴拉巴拉设备',
          model: '养老型',
          variety: '吧你类',
          location: '上虞',
          principal: '王强'
        },
        {
          equip_id: 2,
          equip_number: 12,
          equip_name: '巴拉巴拉设备',
          model: '养老型',
          variety: '吧你类',
          location: '上虞',
          principal: '王强'
        },
        {
          equip_id: 3,
          equip_number: 12,
          equip_name: '巴拉巴拉设备',
          model: '养老型',
          variety: '吧你类',
          location: '上虞',
          principal: '王强'
        }
      ]
    }
  }
}
</script>
<style scoped>
.attribute {
  background-color: #fafafa;
  float: left;
  margin: 2%;
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
}
</style>