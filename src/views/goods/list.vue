<template>
  <div>
      <el-table :data="getGoodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" > </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格" > </el-table-column>
      <el-table-column prop="market_price" label="市场价格" > </el-table-column>
      <el-table-column  label="图片">
          <template slot-scope="item">
              <div>
                  <img class="img" :src="$imgUrl+item.row.img " alt="">
              </div>
          </template> </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew==1" type='success'>是
            </el-tag>
        <el-tag v-else type='danger'>否</el-tag>
          </div>
        </template>
         </el-table-column>
         <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot==1" type='success'>是</el-tag>
        <el-tag v-else type='danger'>否</el-tag>
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
      <el-table-column label="操作" width="180">
        <template slot-scope="item">
          <div>
          <el-button type='primary' size='small' @click="edit(item.row.id)" >编辑</el-button>
        <el-button type='danger' size='small' @click="del(item.row.id)">删除</el-button>  
          </div>
        </template>
        </el-table-column>
    </el-table>
   <el-pagination :page-size='getGoodsSize' background layout="prev, pager, next" :total="getGoodsCount"   @current-change='changePage'> </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delGoods} from '../../util/axios'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsListAction(),
    this.getCountAction()

  },
  computed:{
      ...mapGetters({
          getGoodsList:'goods/getGoodsList',
          getGoodsSize:'goods/getGoodsSize',
          getGoodsCount:'goods/getGoodsCount'
      })
  },
  methods:{
      ...mapActions({
        getGoodsListAction:"goods/getGoodsListAction",
        getCountAction:"goods/getCountAction",
        changePageAction:"goods/changePageAction"
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
          delGoods({
          id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //删除之后要重新调取列表
              this.getGoodsListAction();
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
.el-pagination
  margin-top 30px
  float right
.img
  width 120px
  height 120px
</style>
