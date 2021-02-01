<template>
  <div>
       <el-table :data="getMangerList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"> </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1" type='success'>启用</el-tag>
        <el-tag v-else type='danger'>禁用</el-tag>
          </div>
        </template>
         </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
          <el-button type='primary' size='small' @click="edit(item.row.uid)" >编辑</el-button>
        <el-button type='danger' size='small' @click="del(item.row.uid)">删除</el-button>  
          </div>
        </template>
        
         </el-table-column>
    </el-table>
    <el-pagination :page-size='getMangeSize' background layout="prev, pager, next" :total="getCountNum"   @current-change='changePage'>
      
    </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delManger} from '../../util/axios'
export default {
  data() {
    return {
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  computed:{
      ...mapGetters({
          getMangerList:'manger/getMangerList',
          getMangeSize:'manger/getMangerSize',
          getCountNum:'manger/getMangerNum'
      })
  },
  mounted() {
      this.getMangerListAction()
      this.getCountAction()  
      },
  methods: {
      ...mapActions({
          getMangerListAction:'manger/getMangerListAction',
          getCountAction:'manger/getMangerCountAction',
          changePageAction:'manger/changePageAction'  
      }),
      changePage(n){
          this.changePageAction(n)
      },
      edit(id){
          this.$emit('edit',id)
      },
       del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          delManger({
            uid:id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //删除之后要重新调取列表
              this.getMangerListAction();
              //重新调取总条数
              this.getCountAction()
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
};
</script>

<style lang="" scoped>
</style>
