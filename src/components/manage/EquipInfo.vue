<template>
<div style="width:100%;">
<div>
  <el-button type="primary"  icon="el-icon-circle-plus" @click="addClick">设备准确新增</el-button>
</div>

<div>
  <el-dialog title="添加设备详情" :visible.sync="editFormVisible" :close-on-click-modal="false" width="70%">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="设备编号" prop="equip_number">
					<!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
              <el-input v-model="editForm.equip_number" placeholder="请输入项目编号" ></el-input>
				</el-form-item>
				<el-form-item label="设备名称" prop="equip_name">
					<!-- <el-input-number v-model="editForm.reserve"></el-input-number> -->
              <el-input v-model="editForm.equip_name" placeholder="请输入项目对应的设备名称" ></el-input>
				</el-form-item>
        <el-form-item label="设备类别" prop="variety">
          <el-select v-model="editForm.variety" placeholder="请选择设备类别" >
          <el-option label="药用粉碎器械" value="药用粉碎器械"></el-option>
          <el-option label="药用制作器械" value="药用制作器械"></el-option>
          <el-option label="药用切割器械" value="药用切割器械"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="设备品牌" prop="brand">
					  <el-input v-model="editForm.brand" placeholder="请输入设备品牌" ></el-input>
				</el-form-item>
        <el-form-item label="设备型号" prop="model">
					  <el-input v-model="editForm.model" placeholder="请输入设备型号" ></el-input>
				</el-form-item>
        <el-form-item label="使用位置" prop="location">
					  <el-select v-model="editForm.location" placeholder="请选择设备类别" >
              <el-option label="A楼" value="A楼"></el-option>
              <el-option label="B楼" value="B楼"></el-option>
              <el-option label="C楼" value="C楼"></el-option>
              <el-option label="D楼" value="D楼"></el-option>
              <el-option label="E楼" value="E楼"></el-option>
              <el-option label="X楼" value="X楼"></el-option>
            </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
         <el-button @click.native="editFormVisible = false">算了，再看看</el-button>
				<el-button type="primary" @click.native="addTableData">确定</el-button>
			</div>
		</el-dialog>
</div>
<div id="add-header">
  <el-row :gutter="10" class="input-header" style="width:100%;margin-left:0;" type="flex" justify="center">
      
      <el-col><el-input v-model="equip_number" placeholder="设备编号" size="small"></el-input></el-col>
      <el-col><el-input v-model="equip_name" placeholder="设备名称" size="small"></el-input></el-col>
      <el-col>
          <el-select v-model="variety" placeholder="请选择设备类别" size="small">
          <el-option label="药用粉碎器械" value="药用粉碎器械"></el-option>
          <el-option label="药用制作器械" value="药用制作器械"></el-option>
          <el-option label="药用切割器械" value="药用切割器械"></el-option>
          </el-select>
      </el-col>
      <el-col><el-input v-model="brand" placeholder="设备品牌" size="small"></el-input></el-col>
      <el-col><el-input v-model="model" placeholder="设备型号" size="small"></el-input></el-col>
      <!-- <el-col><el-input v-model="location" placeholder="使用位置" size="small"></el-input></el-col> -->
      <el-col>
        <el-select v-model="location" placeholder="设备位置" size="small">
              <el-option label="A楼" value="A楼"></el-option>
              <el-option label="B楼" value="B楼"></el-option>
              <el-option label="C楼" value="C楼"></el-option>
              <el-option label="D楼" value="D楼"></el-option>
              <el-option label="E楼" value="E楼"></el-option>
              <el-option label="X楼" value="X楼"></el-option>
            </el-select>
      </el-col>
      <el-col><el-button type="primary" size="small" @click="addTableData(1)">快速添加</el-button></el-col>
      
  </el-row>
</div>
<div style="width:100%;">
  <div style="width:100%;">
    <el-table :data="tableData"  class="tb-edit" style="width: 100%;"  stripe
    @row-click="handleCurrentChange" v-loading="loading">
    <el-table-column
      label="设备编号"
      width="120">
      <template slot-scope="scope">
        <i class="el-icon-setting"></i>
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.equip_number" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <span v-else style="padding-left: 20px;">{{scope.row.equip_number}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="设备名称"
       show-overflow-tooltip
      width="140">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.equip_name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.equip_name}}</span>
      </template>
    </el-table-column>
<!-- 
     <el-table-column
      label="类型"
      show-overflow-tooltip
      width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.variety" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span>
        <span v-else style="padding-left: 20px;">{{scope.row.variety}}</span>
      </template>
    </el-table-column> -->


     <el-table-column
     show-overflow-tooltip
      label="设备品牌"
      width="140">
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
      width="120">
      <template slot-scope="scope">
        <!-- <span v-if="scope.row.isSet">
            <el-input size="small" v-model="scope.row.location" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)">
            </el-input>
        </span> -->
        	  <el-select v-if="scope.row.isSet" v-model="scope.row.location" placeholder="请选择设备类别" size="small">
              <el-option label="A楼" value="A楼"></el-option>
              <el-option label="B楼" value="B楼"></el-option>
              <el-option label="C楼" value="C楼"></el-option>
              <el-option label="D楼" value="D楼"></el-option>
              <el-option label="E楼" value="E楼"></el-option>
              <el-option label="X楼" value="X楼"></el-option>
            </el-select>
        <span v-else style="padding-left: 20px;">{{scope.row.location}}</span>
      </template>
    </el-table-column>

    <el-table-column 
      label="启用状态"
      width="260"
       >
      <template slot-scope="scope">
        <!-- <el-switch v-if="scope.row.isSet"
          v-model="scope.row.state"
          :active-value=1
          :inactive-value=0
          :disabled="isSwitchDisabled"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
        <el-switch v-else
          v-model="scope.row.state"
          :active-value=1
          :inactive-value=0
          :disabled=true
          active-text="启用"
          inactive-text="禁用">
        </el-switch> -->
        <el-radio-group v-if="scope.row.isSet"
         v-model="scope.row.state"  
         :disabled="isRadioDisabled" size="mini">
          <el-radio-button label="报废" ></el-radio-button>
          <el-radio-button label="运行" ></el-radio-button>
          <el-radio-button label="维修" ></el-radio-button>
          <el-radio-button label="停用" ></el-radio-button>
        </el-radio-group>
        <el-radio-group v-else
         v-model="scope.row.state"  
         :disabled="true" size="mini">
          <el-radio-button label="报废" ></el-radio-button>
          <el-radio-button label="运行" ></el-radio-button>
          <el-radio-button label="维修" ></el-radio-button>
          <el-radio-button label="停用" ></el-radio-button>
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
  </div>
  
</template>

<script type="text/ecmascript-6">
    export default {
        created() {
          this.getTableData();
        },
        data() {
            return {
            equip_number: '',
            equip_name: '',
            brand:'',
            model:'',
            variety:'',
            location:'',
            state:'',

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
            isRadioDisabled:true,
            editFormVisible:false,


            radioModel:'',
            pageCount: 1,
            endChangePage: 1,
            size: 7,

            tableData:[],

            editForm:{
            equip_number:'',
            equip_name:'',
            location:'',
            variety:'',
            model:'',
            brand:'',

            },

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
                this.isRadioDisabled = false;
                this.isCancelBtnDisabled = false;
                row.isSet = true;
                return row.isSet;
            },
            handleSave(index,row){
              row.isSet = false;
              for (let i of this.tableData) {
                        if (i.isSet!==false && i.index!==row) {
                            this.$message.warning("请先保存当前编辑项");
                            return false;
                        }
                        else{
                            var obj = {
                              equip_id:row.equip_id,
                              equip_number:row.equip_number,
                              equip_name:row.equip_name,
                              brand:row.brand,
                              model:row.model,
                              variety:row.variety,
                              location:row.location
                            }
                            this.updateTableData(obj);
                            var stateNow;
                            if(row.state === "报废"){
                              stateNow = 0;
                            }else if(row.state === "运行"){
                              stateNow = 1;
                            }else if(row.state === "维修"){
                              stateNow = 2;
                            }else if(row.state === "停用"){
                              stateNow = 3;
                            }
                            var list = {
                              equip_id:row.equip_id,
                              state:stateNow,//--------------------------
                              page:this.endChangePage,
                              size:7
                            }
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
                
                res = await this.$http.get('/admin/searchAllEquip',{
                params: {
                  page: page,
                  size: this.size
                },
                // headers: { Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU4MTE3MzAsInVzZXJuYW1lIjoiODg4ODg4In0.hePZfgJ_1mj3LV_BpF8JRnRAFPFueh2JbqyrQxFDAyk' + localStorage.getItem('token') }
                });

                let { data, meta } = res.data
               
                 for(var i =0;i<data.equipment.content.length;i++){
                     if(data.equipment.content[i].state === 0){
                      data.equipment.content[i].state = "报废"
                    }else if(data.equipment.content[i].state === 1){
                      data.equipment.content[i].state = "运行"
                    }else if(data.equipment.content[i].state === 2){
                      data.equipment.content[i].state = "维修"
                    }else if(data.equipment.content[i].state === 3){
                      data.equipment.content[i].state = "停用"
                    }
                 }
                 console.log(data.equipment.content);
                if (meta.status === 200) {
                  
                    let array=[];
                    data.equipment.content.map((item,index)=>{
                      array.push(
                          Object.assign({},item,{isSet:false})
                    )
                    return array;
                  })
                  this.tableData = array;
                  this.pageCount = data.equipment.totalPages;
                  console.log("data.totalPage",data.equipment.totalPages);
                  console.log("endChangePage",this.endChangePage);
                  // 有时修改数据后要往后退一页，或者到最后一页，但请求之前total数据没更新，如果新一页多了一条数据，就会跳不过去，所以跳转页面还要在最后重新跳转
                  this.endChangePage = page;
                  this.loading = false;
                }
                
            },

            // --------快速新增设备数据请求--------
            async addTableData(){
              var list = {
                equip_number: this.equip_number,
                equip_name: this.equip_name,
                brand:this.brand,
                model:this.model,
                location:this.location
                
                };
                var res = {};
                
                res = await this.$http.post('/admin/addEquip',list);

                const { data, meta } = res.data
                console.log(data.equipment);
                if (meta.status === 200) {
                  
                    let array=[];
                    data.equipment.map((item,index)=>{
                      array.push(
                          Object.assign({},item,{isSet:false})
                    )
                    return array;
                  })
                  this.tableData = array;
                  this.getTableData();
                }  
            },


             // --------新增设备数据请求--------
            async addTableData(){
              
                this.editForm.page = this.pageCount;
                this.editForm.size = this.size;
                this.editForm.project_state = 1;

                this.editFormVisible = false;

                var res = {};
                
                res = await this.$http.post('/admin/addEquip',this.editForm);

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

            // --------设备信息修改请求--------
            async updateTableData(obj){
                var res = {};
                //console.log(this.row);
                res = await this.$http.put('/admin/changeEquipInfo',obj);

                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData(this.endChangePage);
                  
                }
            },

            // --------设备状态修改请求--------
            async updateStatus(list){
                var res = {};
                console.log("this is the list",list);
                res = await this.$http.put('/admin/deleteEquip',list);
                const { data, meta } = res.data
                if (meta.status === 200) {
                  this.getTableData(this.endChangePage);
                  
                }
            },
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
  @media screen and (max-width: 767px) {
    #add-header{
      display: none;
    }
  }

</style>
