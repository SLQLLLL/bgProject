<template>
  <div>
      <el-table :data="bannerList" border style="width: 100%"   
       >
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="title" label="轮播图标题"> </el-table-column>
        <el-table-column  label="图片"> 
          <template slot-scope="item">
          <div >
            <img
              class="img"
              :src="item.row.img?$imgUrl+item.row.img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3362606401,1751985198&fm=26&gp=0.jpg'"
              alt
            />
          </div>
        
        </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="item">
            <div>
            <el-button type="primary" @click="changeBanner(item.row.id)"  size='small'>编辑</el-button>
          <el-button type="danger" size='small' @click='del(item.row.id)'>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delBanner } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getBannerListAction();
    
  },
  computed: {
   ...mapGetters({
     bannerList:"banner/getBannerlist"
   })
  },

  methods: {
    ...mapActions({
      getBannerListAction:"banner/getBannerListAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBanner({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getBannerList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装编辑事件
    changeBanner(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .img
    width: 120px;
    height: 120px;
</style>
