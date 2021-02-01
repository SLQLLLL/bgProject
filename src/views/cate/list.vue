<template>
  <div>
    <el-table
      :data="getCateList"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column  label="图片">
          <template slot-scope="item">
              <div v-if="item.row.pid!=0">
                  <img class="img" :src="$imgUrl+item.row.img " alt="">
              </div>
          </template> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.id)" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {delCate} from '../../util/axios'
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
  mounted() {
      this.getCateListAction()
  },
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("你确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
          delCate({id}).then(res=>{
              if(res.data.code==200){
                  this.$message.success(res.data.msg)
                  this.getCateListAction()
              }else{
                  this.$message.error(res.data.msg)
              }
          })
      })
      .catch(()=>{
          this.$message({
              type:"info",
              message:"已取消删除"
          });
      })
    },
    edit(id){
        this.$emit('edit',id)
    }
  },
};
</script>

<style lang="stylus" scoped>
    .img 
        width 120px
        height 120px
</style>
