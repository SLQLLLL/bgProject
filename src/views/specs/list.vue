<template>
  <div>
      <el-table :data="getSpecsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"> </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            
            <el-tag v-for="attr in item.row.attrs" :key="attr" type='info'>{{attr}}</el-tag>
          </div>
        </template>
      </el-table-column>
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
   <el-pagination :page-size='getSpecsSize' background layout="prev, pager, next" :total="getSpecsCount"   @current-change='changePage'> </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delSpecs} from '../../util/axios'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsListAction(),
    this.getCountAction()

  },
  computed:{
      ...mapGetters({
          getSpecsList:'specs/getSpecsList',
          getSpecsSize:'specs/getSpecsSize',
          getSpecsCount:'specs/getSpecsCount'
      })
  },
  methods:{
      ...mapActions({
        getSpecsListAction:"specs/getSpecsListAction",
        getCountAction:"specs/getCountAction",
        changePageAction:"specs/changePageAction"
      }),
      changePage(n){
        this.changePageAction(n)
      },
      //封装删除的方法
      del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          delSpecs({
          id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //删除之后要重新调取列表
              this.getSpecsListAction();
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
    },
    //封装修改的接口
    edit(id){
      this.$emit("edit",id)
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-tag 
  margin-right 5px
</style>
