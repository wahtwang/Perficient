<template>
<div style="width:100%;">
<div>
  <el-row :gutter="10" class="input-header" style="width:100%;" type="flex" justify="center">
      
      <el-col><el-input v-model="equip_id" placeholder="设备编号" size="small"></el-input></el-col>
      <el-col><el-input v-model="equip_name" placeholder="设备名称" size="small"></el-input></el-col>
      <el-col><el-input v-model="brand" placeholder="设备品牌" size="small"></el-input></el-col>
      <el-col><el-input v-model="model" placeholder="设备型号" size="small"></el-input></el-col>
      <el-col><el-input v-model="location" placeholder="使用位置" size="small"></el-input></el-col>
      <el-col><el-button type="primary" size="small" @click="addRow">确定添加</el-button></el-col>
      
  </el-row>
</div>
<div style="width:100%;">
  <div style="width:100%;">
    <el-table :data="tableData"  class="tb-edit" style="width: 100%;"  @row-click="handleCurrentChange">
    <el-table-column
      label="设备编号"
      width="120">
      <template slot-scope="scope">
        <i class="el-icon-setting"></i>
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.equip_id" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <span v-else style="padding-left: 20px;">{{scope.row.equip_id}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="设备名称"
      width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.equip_name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.equip_name}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="设备品牌"
      width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.brand" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.brand}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="设备型号"
      width="130">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.model" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.model}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="使用位置"
      width="140">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.location" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.location}}</span>
      </template>
    </el-table-column>

    <el-table-column 
      label="启用状态"
      width="180"
       >
      <template slot-scope="scope">
        <el-switch v-if="scope.row.isSet"
          v-model="scope.row.on"
          active-value="1"
          inactive-value="0"
          :disabled="isSwitchDisabled"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
        <el-switch v-else
          v-model="scope.row.on"
          active-value="1"
          inactive-value="0"
          :disabled=true
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column 
      label="修改"
      width="130"
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
          @click="handleEdit(scope.$index, scope.row)">修改状态</el-button>

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
          type="success"
          primary
          :disabled="isCancelBtnDisabled"
          @click.native.prevent="handleSave(scope.$index,scope.row)">保存</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>


  <div class="block" align="center" style="margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTableData(endChangePage)"
      :current-page.sync="endChangePage"
      :page-count="pageCount"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
    <!-- <span class="demonstration">点击可直接前往</span> -->
  </div>
  </div>
  </div>
  
</template>

<script type="text/ecmascript-6">
    export default {
        // created() {
        //   this.getTableData();
        // },
        data() {
            return {
            equip_id: '',
            equip_name: '',
            brand:'',
            model:'',
            location:'',

            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',


            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            
            isSwitchDisabled:true,
            isCancelBtnDisabled:true,




            pageCount: 1,
            endChangePage: 1,
            size: 10,

            // tableData:[],

            tableData: [{
            equip_id: 'C0001',
            equip_name: '切片机',
            brand:'世邦工业',
            model:'60目',
            location:'E楼',
            on: '0',
            isSet:false
            }, {
            equip_id: 'C0001',
            equip_name: '超细粉碎机',
            brand:'旭重机械',
            model:'60目',
            location:'E楼',
            on: '0',
            isSet:false
            }, {
            equip_id: 'C0001',
            equip_name: '切片机',
            brand:'世邦工业',
            model:'400目',
            location:'E楼',
            on: '0',
            isSet:false
            }, {
            equip_id: 'C0001',
            equip_name: '切片机',
            brand:'世邦工业',
            model:'60目',
            location:'A楼',
            on: '0',
            isSet:false
            },
            {
            equip_id: 'C0001',
            equip_name: '中草药粉碎机',
            brand:'万顷机械',
            model:'30目',
            location:'A楼',
            on: '0',
            isSet:false
            }, {
            equip_id: 'C0001',
            equip_name: '制丸机',
            brand:'世邦工业',
            model:'100目',
            location:'E楼',
            on: '0',
            isSet:false
            }, {
            equip_id: 'C0001',
            equip_name: '超细粉碎机',
            brand:'万顷机械',
            model:'60目',
            location:'E楼',
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
                            row.isSet = false;
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
            },

            //增加新数据
            addRow () {
              var list = {
                equip_id: this.equip_id,
                equip_name: this.equip_name,
                brand:this.brand,
                model:this.model,
                location:this.location,
                on: '0',
                isSet:false
                }
              this.tableData.unshift(list)
            },



            // --------数据请求--------
            async getTableData(page = 1){
                var res = {};
                
                res = await this.$http.get('/user/searchALLEquip',{
                params: {
                  page: page,
                  size: this.size
                }
                // headers: { Authorization: 'Basic' + localStorage.getItem('token') }
                });
                
                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.tableData = data.tableData;
                  this.pageCount = data.totalPage;
                  // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
                  this.endChangePage = page;
                }
            }
     }
  }
    
</script>

<style scoped>
  .input-header{
      background-color: rgb(212, 212, 212);
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
  }

</style>
