<template>
<div style="width:100%;">
  <div style="width:100%;">
    <el-table :data="tableData" :highlight-current-row="isHighlight" class="tb-edit" style="width: 100%;" @row-click="handleCurrentChange">
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
          <p>电话: {{ scope.row.phone }}</p>
          <p>邮箱: {{ scope.row.email }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
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
      label="项目组"
      width="130">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
        <el-input size="small" v-model="scope.row.group" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
        </el-input> 
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.group}}</span>
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
          v-model="scope.row.on"
          active-value="1"
          inactive-value="0"
          :disabled="isSwitchDisabled"
          active-text="管理员"
          inactive-text="普通用户">
        </el-switch>
        <el-switch v-else
          v-model="scope.row.on"
          active-value="1"
          inactive-value="0"
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
          @click="deleteRow(scope.$index, tableData)"
         >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>


  <div class="block" align="center" style="margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
    <!-- <span class="demonstration">点击可直接前往</span> -->
  </div>
  </div>
</template>




<script>
export default {
    data(){
        return{
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            isHighlight:false,
            isSwitchDisabled:true,
            isCancelBtnDisabled:true,

            tableData: [{
            user_id: '5000001',
            nickname: '王煜辉',
            email: '77839483@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'实验部',
            sex:'先生',
            on: '0',
            isSet:false
            }, {
            user_id: '5000002',
            nickname: '杨凯',
            email: 'dfdsfdks@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'技术部',
            sex:'先生',
            on: '1',
            isSet:false
            }, {
            user_id: '5000003',
            nickname: '侯家炜',
            email: '43k5nk43@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'办公部',
            sex:'先生',
            on: '0',
            isSet:false
            }, {
            user_id: '5000004',
            nickname: '叶希臣',
            email: '4949632@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'技术部',
            sex:'先生',
            on: '0',
            isSet:false
            },
            {
            user_id: '5000001',
            nickname: '王煜辉',
            email: '77839483@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'实验部',
            sex:'先生',
            on: '0',
            isSet:false
            }, {
            user_id: '5000002',
            nickname: '杨凯',
            email: 'dfdsfdks@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'技术部',
            sex:'先生',
            on: '1',
            isSet:false
            }, {
            user_id: '5000003',
            nickname: '侯家炜',
            email: '43k5nk43@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'办公部',
            sex:'先生',
            on: '0',
            isSet:false
            }, {
            user_id: '5000004',
            nickname: '叶希臣',
            email: '4949632@qq.com',
            phone:'13728943984',
            group:'项目组二',
            department:'技术部',
            sex:'先生',
            on: '0',
            isSet:false
            }],

      
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
                            this.$message({
                              type: 'success',
                              message: '保存成功!'
                            });
                            // this.isCancelBtnDisabled=true;
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


