<template>
<div style="width:100%;">
  <div style="text-align:center;">
      <el-input class="search-input" style="padding-top:10px;padding-bottom:10px;"
       placeholder="输入相关信息，键入回车以搜索" prefix-icon="el-icon-search" size="mini" 
      v-model="log" @keyup.enter.native="getTableData(page = 1)"></el-input>
  </div>
  <div style="width:100%;">
    <el-table :data="tableData" class="tb-edit" style="width: 100%;" 
    @row-click="handleCurrentChange" v-loading="loading">
    <el-table-column
      label="用户"
      width="160">
      <template slot-scope="scope">
        <i class="el-icon-success"></i>
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <span style="padding-left: 20px;">{{scope.row.username}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="身份"
      width="150">
      <template slot-scope="scope">
        <span style="padding-left: 20px;">{{scope.row.permission}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="操作"
      width="210">
      <template slot-scope="scope">
        <span style="padding-left: 20px;">{{scope.row.operation}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="参数"
      width="380">
      <template slot-scope="scope">
        <span style="padding-left: 20px;">{{scope.row.params}}</span>
      </template>
    </el-table-column>

       <el-table-column
      label="操作时间"
      >
      <template slot-scope="scope">
        <span style="padding-left: 20px;">{{scope.row.create_date}}</span>
      </template>
    </el-table-column>

    </el-table>
  </div>


  <div class="block" align="center" style="margin-top:20px;">
    <el-pagination
      @current-change="getTableData(endChangePage)"
      :current-page.sync="endChangePage"
      :page-count="pageCount"
      :page-size="size"
      background
      layout="prev, pager, next, jumper">
    </el-pagination>
    <!-- <span class="demonstration">点击可直接前往</span> -->
  </div>
  </div>
</template>




<script>
export default {
  created() {
          this.getTableData();
          
        },
    
    data(){
        return{
            
            loading: true,
            isHighlight:false,
            isSwitchDisabled:true,
            isCancelBtnDisabled:true,

            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            pageCount: 1,
            endChangePage: 1,
            size: 8,
            log:'',

            tableData:[],

            // tableData: [{
            // username: '5000001',
            // permission: '[ROLE_1]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'173.23.12.50'
            // }, {
            // username: '5000004',
            // permission: '[ROLE_2]',
            // operation: '用户修改密码',
            // params:'[{"oldPassword":"123","newPassword":"cs123456"}]',
            // ip:'170.0.12.122'
            // }, {
            // username: '5000033',
            // permission: '[ROLE_3]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'173.23.12.50'
            // }, {
            // username: '5000997',
            // permission: '[ROLE_2]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'173.44.60.60'
            // },
            // {
            // username: '5000123',
            // permission: '[ROLE_2]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'173.23.12.50'
            // }, {
            // username: '5045301',
            // permission: '[ROLE_3]',
            // operation: '用户修改密码',
            // params:'[{"oldPassword":"123","newPassword":"cs123456"}]',
            // ip:'173.23.12.50'
            // }, {
            // username: '5000556',
            // permission: '[ROLE_1]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'171.33.12.53'
            // }, {
            // username: '5034001',
            // permission: '[ROLE_1]',
            // operation: '对于设备的模糊查询',
            // params:'[{"equip":"粉碎","page":"1","size":"18"}]',
            // ip:'173.23.12.50'
            // }],

      
        }
    },
     methods: {
            
            //表格的编辑方法
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
                
            },
          


            //分页及跳转方法
            handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            },

             deleteRow(index,rows) {
                this.$confirm('此操作将永久删除该记录项, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // deleteRow(scope.$index, tableData);
                  rows.splice(index, 1);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },

        //--------设备基础信息页面数据请求--------
            async getTableData(page = 1){
                var res = {};
                res = await this.$http.get('/superadmin/searchAllLog',{
                params: {
                  page: page,
                  size: this.size,
                  log:  this.log
                },
                // headers: { Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU4MTE3MzAsInVzZXJuYW1lIjoiODg4ODg4In0.hePZfgJ_1mj3LV_BpF8JRnRAFPFueh2JbqyrQxFDAyk' + localStorage.getItem('token') }
                });

                const { data, meta } = res.data
                console.log(data.log);
                
                  this.tableData = data.log;
                  this.pageCount = data.totalPage;
                  // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
                  this.endChangePage = page;
                  this.loading = false;
                }
                
            }
     }
  
</script>


<style>
/* .tb-edit .el-input {
    display: block
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
} */


.el-button--info.is-plain:focus {
    color:#909399 !important;
    background:#f4f4f5 !important;
    border-color:#d3d4d6 !important;
}
</style>
