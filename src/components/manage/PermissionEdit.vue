<template>
<div style="width:100%;">
  <div style="width:100%;">
    <el-table :data="tableData" :highlight-current-row="isHighlight" class="tb-edit" stripe
    style="width: 100%;" @row-click="handleCurrentChange" v-loading="loading">
    <el-table-column
      label="用户编号"
      width="180">
      <template slot-scope="scope">
        <i class="three-aliyonghu"></i>
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.user_id" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.user_id}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="120">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <!-- <p>电话: {{ scope.row.phone }}</p> -->
          <p>邮箱: {{ scope.row.email }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

     <el-table-column
      label="性别"
      width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
        <el-input size="small" v-model="scope.row.sex" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
        </el-input> 
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.sex}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="联系方式"
      width="130">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
        <el-input size="small" v-model="scope.row.phone" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
        </el-input> 
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.phone}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="部门"
      width="140">
      <template slot-scope="scope">
         <span v-if="scope.row.isSet">
        <el-input size="small" v-model="scope.row.department" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
        </el-input> 
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.department}}</span>
      </template>
    </el-table-column>

    <el-table-column 
      label="权限"
      width="240"
       >
      <template slot-scope="scope">
        <el-switch v-if="scope.row.isSet"
          v-model="scope.row.permissions"
          :active-value="1"
          :inactive-value="0"
          :disabled="isSwitchDisabled"
          active-text="管理员"
          inactive-text="普通用户">
        </el-switch>
        <el-switch v-else
          v-model="scope.row.permissions"
          :active-value="1"
          :inactive-value="0"
          :disabled=true
          active-text="管理员"
          inactive-text="普通用户">
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column 
      label="修改"
      width="100"
     >
     
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
           <!-- <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="handleEdit(scope.$index, scope.row)">
                                {{scope.row.isSet?'保存':"修改"}}
                            </span> -->

        <el-button
          type="primary"
          size="mini"
          style="float:left;"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>

        <!-- <el-button
          size="mini"
          type="danger"
         @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button> -->
      </template>
    </el-table-column>

    <el-table-column 
      label="操作"
     >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          plain
          :disabled="isCancelBtnDisabled"
          @click.native.prevent="handleSave(scope.$index,scope.row)">保存</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="deleteRow(scope.$index, scope.row)"
         >删除</el-button>
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
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            loading:true,
            isHighlight:false,
            isSwitchDisabled:true,
            isCancelBtnDisabled:true,

            pageCount: 1,
            endChangePage: 1,
            size: 9,

            tableData:[],

            // tableData: [{
            // user_id: '5000001',
            // name: '王煜辉',
            // email: '77839483@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'实验部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // }, {
            // user_id: '5000002',
            // name: '杨凯',
            // email: 'dfdsfdks@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'技术部',
            // sex:'先生',
            // state: '1',
            // isSet:false
            // }, {
            // user_id: '5000003',
            // name: '侯家炜',
            // email: '43k5nk43@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'办公部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // }, {
            // user_id: '5000004',
            // name: '叶希臣',
            // email: '4949632@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'技术部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // },
            // {
            // user_id: '5000001',
            // name: '王煜辉',
            // email: '77839483@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'实验部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // }, {
            // user_id: '5000002',
            // name: '杨凯',
            // email: 'dfdsfdks@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'技术部',
            // sex:'先生',
            // state: '1',
            // isSet:false
            // }, {
            // user_id: '5000003',
            // name: '侯家炜',
            // email: '43k5nk43@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'办公部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // }, {
            // user_id: '5000004',
            // name: '叶希臣',
            // email: '4949632@qq.com',
            // phone:'13728943984',
            // group:'项目组二',
            // department:'技术部',
            // sex:'先生',
            // state: '0',
            // isSet:false
            // }],

      
        }
    },
     methods: {
            
            //表格的编辑方法
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
                
            },
            handleEdit(index, row) {
              //点击修改 判断是否已经保存所有操作
                    for (let i of this.tableData) {
                        if (i.isSet!==false && i.index!==row) {  //还有错误需要修改，后面为判断这一行
                            this.$message.warning("请先保存当前编辑项");
                            return false;
                        }
                    }
                console.log(index, row);
                this.isHighlight = true;
                this.isSwitchDisabled = false;
                this.isCancelBtnDisabled = false;
                row.isSet = true;
                return row.isSet;
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleUpdate(formName) {
                
            },
            // deleteRow(index, rows) {
            //   rows.splice(index, 1);
            // },
            handleSave(index,row){
              this.isHighlight = false;
              row.isSet = false;
              for (let i of this.tableData) {
                        if (i.isSet!==false && i.index!==row) {
                            this.$message.warning("请先保存当前编辑项");
                            return false;
                        }
                        else{
                            this.updateTableData(row);
                            this.$message({
                              type: 'success',
                              message: '保存成功!'
                            });
                            // this.isCancelBtnDisabled=true;
                            row.isSet = false;
                            }
                    }
                    console.log(index, row);
                
            },
          


            //分页及跳转方法
            handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            },

             deleteRow(index,row) {
               
               console.log(index,row);
            this.$confirm('此操作将永久删除  '+row.user_id+'  '+row.name+'  员工, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // deleteRow(scope.$index, tableData);
              //  row.splice(index, 1);
              var list = {
                state: 0,
                user_id: row.user_id
              }
              console.log(list);
              this.deleteTableData(list);
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

            // --------用户权限基础信息数据请求--------
            async getTableData(page = 1){
                var res = {};
                
                res = await this.$http.get('/admin/searchAllUser',{
                params: {
                  page: page,
                  size: this.size
                },
                // headers: { Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU4MTE3MzAsInVzZXJuYW1lIjoiODg4ODg4In0.hePZfgJ_1mj3LV_BpF8JRnRAFPFueh2JbqyrQxFDAyk' + localStorage.getItem('token') }
                });

                const { data, meta } = res.data
                console.log(data.users);
                if (meta.status === 200) {
                  
                    let array=[];
                    data.users.map((item,index)=>{
                      array.push(
                          Object.assign({},item,{isSet:false})
                    )
                    return array;
                  })
                  this.tableData = array;
                  this.pageCount = data.totalPage;
                  // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
                  this.endChangePage = page;
                  this.loading = false;
                }
            },


            // --------用户信息修改请求--------
            async updateTableData(row){
                var res = {};
                //console.log(this.row);
                res = await this.$http.put('/superadmin/changeUserPermission',row);

                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData();
                  
                }
            },

            // --------用户信息删除请求--------
            async deleteTableData(list){
                var res = {};
                //console.log(this.row);
                res = await this.$http.put('/admin/deleteUser',list);

                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData();
                  
                }
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


