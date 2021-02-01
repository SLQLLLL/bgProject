<template>
  <div>
    <el-table :data="getRoleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
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
          <el-button type='primary' size='small' @click="edit(item.row.id)" >编辑</el-button>
        <el-button type='danger' size='small' @click="del(item.row.id)">删除</el-button>  
          </div>
        </template>
        
         </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delRole} from '../../util/axios'
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
      getRoleList:'role/getRoleList'
    })
  },
  methods: {
    ...mapActions({
      getRoleListAction:"role/getRoleListAction"
    }),
     del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          delRole({
            id
          }).then(res => {
            if(res.data.code===200){
              this.$message.success(res.data.msg)
              //删除之后要重新调取列表
              this.getRoleListAction()
            }else{
              this.$message.error(res.data.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.getRoleListAction()
  },
};
</script>

<style lang="" scoped>
</style>
