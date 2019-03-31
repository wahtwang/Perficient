<template>
  <div class="container">
    <div style="text-align:center;">
      <el-input class="search-input" placeholder="输入相关设备信息" prefix-icon="el-icon-search" size="mini" v-model="searchStr"></el-input>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {}
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
  margin-bottom: 1.5%;
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
