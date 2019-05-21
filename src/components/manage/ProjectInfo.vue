<template>
<div style="width:100%;height:100%;" class="projectInfo_bg">
<div>
  <!-- <el-row :gutter="10" class="input-header" style="width:100%;" type="flex" justify="center">
      
      <el-col><el-input v-model="project_id" placeholder="项目编号" size="small"></el-input></el-col>
      <el-col><el-input v-model="user_id" placeholder="用户编号" size="small"></el-input></el-col>
      <el-col><el-input v-model="project_name" placeholder="项目名称" size="small"></el-input></el-col>
      <el-col><el-button type="primary" size="small" @click="addTableData(1)">确定添加</el-button></el-col>
      
  </el-row> -->
  <el-button type="primary"  icon="el-icon-circle-plus" @click="addClick">新增项目</el-button>
</div>
<div style="width:100%;">
  <div style="width:100%;">
    <el-table :data="tableData"  class="tb-edit" style="width: 100%;"  stripe 
    @row-click="handleCurrentChange" v-loading="loading">
    <el-table-column
      label="项目编号"
      width="120">
      <template slot-scope="scope">
        <i class="el-icon-star-on"></i>
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.project_number" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <span v-else style="padding-left: 20px;">{{scope.row.project_number}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户编号"
      width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.user_id" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.user_id}}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="项目名称" show-overflow-tooltip
      width="300">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.project_name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.project_name}}</span>
      </template>
    </el-table-column>

    <el-table-column 
      label="项目状态"
      width="230"
       >
      <template slot-scope="scope">
        <!-- <el-switch v-if="scope.row.isSet"
          v-model="scope.row.project_state"
          :active-value=1
          :inactive-value=0
          :disabled="isSwitchDisabled"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
        <el-switch v-else
          v-model="scope.row.project_state"
          :active-value=1
          :inactive-value=0
          :disabled=true
          active-text="启用"
          inactive-text="禁用">
        </el-switch> -->
         <el-radio-group v-if="scope.row.isSet"
         v-model="scope.row.project_state"  
         :disabled="isRadioDisabled" size="mini">
          <el-radio-button label="完成" ></el-radio-button>
          <el-radio-button label="进行" ></el-radio-button>
          <el-radio-button label="暂停" ></el-radio-button>
        </el-radio-group>
        <el-radio-group v-else
         v-model="scope.row.project_state"  
         :disabled="true" size="mini">
          <el-radio-button label="完成" ></el-radio-button>
          <el-radio-button label="进行" ></el-radio-button>
          <el-radio-button label="暂停" ></el-radio-button>
        </el-radio-group>
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
          @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>

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
      @current-change="getTableData(endChangePage)"
      :current-page.sync="endChangePage"
      :page-count="pageCount"
      :page-size="size"
      layout="prev, pager, next, jumper">
    </el-pagination>
    <!-- <span class="demonstration">点击可直接前往</span> -->
  </div>
  </div>
  <div>
      <el-dialog title="添加项目详情" :visible.sync="editFormVisible" :close-on-click-modal="false" >
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="项目编号" prop="project_number">
					<!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
              <el-input v-model="editForm.project_number" placeholder="请输入项目编号" ></el-input>
				</el-form-item>
				<el-form-item label="用户编号" prop="user_id">
					<!-- <el-input-number v-model="editForm.reserve"></el-input-number> -->
              <el-input v-model="editForm.user_id" placeholder="请输入项目对应的用户编号" ></el-input>
				</el-form-item>
				<el-form-item label="项目名称" prop="project_name">
					  <el-input v-model="editForm.project_name" placeholder="请输入项目名称" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
         <el-button @click.native="editFormVisible = false">算了，再看看</el-button>
				<el-button type="primary" @click.native="addTableData">确定</el-button>
			</div>
		</el-dialog>
  </div>
  </div>
  
</template>

<script type="text/ecmascript-6">
    export default {
        created() {
          this.getTableData();
        },
        data() {
            return {
            editForm:{
            project_number:'',
            user_id:'',
            project_name:''
            },

            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',


            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            loading:true,
            isSwitchDisabled:true,
            isCancelBtnDisabled:true,
            editFormVisible: false,

            isRadioDisabled:false,

            pageCount: 1,
            endChangePage: 1,
            size: 8,

            tableData:[],

            // tableData: [{
            // equip_number: 'C0001',
            // equip_name: '切片机',
            // brand:'世邦工业',
            // model:'60目',
            // location:'E楼',
            // state: 0,
            // isSet:false
            // }, {
            // equip_number: 'C0001',
            // equip_name: '超细粉碎机',
            // brand:'旭重机械',
            // model:'60目',
            // location:'E楼',
            // state: 0,
            // isSet:false
            // }, {
            // equip_number: 'C0001',
            // equip_name: '切片机',
            // brand:'世邦工业',
            // model:'400目',
            // location:'E楼',
            // state: 0,
            // isSet:false
            // }, {
            // equip_number: 'C0001',
            // equip_name: '切片机',
            // brand:'世邦工业',
            // model:'60目',
            // location:'A楼',
            // state: 0,
            // isSet:false
            // },
            // {
            // equip_number: 'C0001',
            // equip_name: '中草药粉碎机',
            // brand:'万顷机械',
            // model:'30目',
            // location:'A楼',
            // state: '0',
            // isSet:false
            // }, {
            // equip_number: 'C0001',
            // equip_name: '制丸机',
            // brand:'世邦工业',
            // model:'100目',
            // location:'E楼',
            // state: 0,
            // isSet:false
            // }, {
            // equip_number: 'C0001',
            // equip_name: '超细粉碎机',
            // brand:'万顷机械',
            // model:'60目',
            // location:'E楼',
            // state: 0,
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
                // console.log(typeof row);
                
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
                            this.updateTableData(row);
                            var stateNow;
                            if(row.project_state === "完成"){
                              stateNow = 0;
                            }else if(row.project_state === "进行"){
                              stateNow = 1;
                            }else if(row.project_state === "暂停"){
                              stateNow = 2;
                            }
                            var list = {
                              project_id:row.project_id,
                              project_state:stateNow,//--------------------------
                              page:this.endChangePage,
                              size:8
                            }
                            console.log("listlistlist",list);
                            this.updateStatus(list);
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
                equip_number: this.equip_number,
                equip_name: this.equip_name,
                brand:this.brand,
                model:this.model,
                location:this.location
                
                };
              console.log(list);
              // this.tableData.push(list);
              
              
              
            },


             addClick: function (index, row) {
              this.editFormVisible = true;
              this.editForm = Object.assign({}, row);
            } ,
      



            // --------设备基础信息数据请求--------
            async getTableData(page = 1){
                var res = {};
                
                res = await this.$http.get('/admin/searchAllProject',{
                params: {
                  page: page,
                  size: this.size
                }
                });

                const { data, meta } = res.data
                console.log(data.projects);

                for(var i =0;i<data.projects.length;i++){
                     if(data.projects[i].project_state === 0){
                      data.projects[i].project_state = "完成"
                    }else if(data.projects[i].project_state === 1){
                      data.projects[i].project_state = "进行"
                    }else if(data.projects[i].project_state === 2){
                      data.projects[i].project_state = "暂停"
                    }
                 }
                if (meta.status === 200) {
                  
                    let array=[];
                    data.projects.map((item,index)=>{
                      array.push(
                          Object.assign({},item,{isSet:false})
                    )
                    return array;
                  })
                  this.tableData = array;
                  this.pageCount = data.totalPage;
                  console.log('this.pageCount',data.totalPage);
                  // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
                  this.endChangePage = page;
                  this.loading = false;
                }
                
            },

            // --------新增项目数据请求--------
            async addTableData(){
              
                this.editForm.page = this.pageCount;
                this.editForm.size = this.size;
                this.editForm.project_state = 1;

                this.editFormVisible = false;

                var res = {};
                
                res = await this.$http.post('/admin/addProject',this.editForm);

                const { data, meta } = res.data
                console.log(data.projects);
                if (meta.status === 200) {
                  
                    let array=[];
                    data.projects.map((item,index)=>{
                      array.push(
                          Object.assign({},item,{isSet:false})
                    )
                    return array;
                  })
                  this.tableData = array;
                  this.getTableData(this.endChangePage);
                }  
            },

            // --------项目信息修改请求--------
            async updateTableData(row){
                var res = {};
                //console.log(this.row);
                res = await this.$http.put('/admin/changeProjectInfo',row);

                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData(this.endChangePage);
                  
                }
            },


            // --------项目状态修改请求--------
            async updateStatus(list){
                var res = {};
                console.log("this is the list",list);
                res = await this.$http.put('/admin/deleteProject',list);
                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData(this.endChangePage);
                  
                }
            },
     }
  }
    
</script>

<style scoped>
.projectInfo_bg{
  background-image: url("../../assets/bg2.jpg");
  background-size: cover;
}
  .input-header{
      background-color: rgb(212, 212, 212);
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
  }

</style>
